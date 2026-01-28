import { getRequestContext, runWithRequestContext, withActivityLoggingSuppressed } from "../Context/RequestContext.js";

const CRUD_ACTIONS = new Set(["create", "update", "delete"]);
const BULK_ACTIONS = new Set(["createmany", "updatemany", "deletemany"]);
const UPSERT_ACTION = "upsert";
const EXCLUDED_MODELS = new Set(["ActivityLog", "SystemLog"]);

function buildModelTableMap(PrismaNamespace) {
	if (!PrismaNamespace?.dmmf?.datamodel?.models) {
		return {};
	}

	return PrismaNamespace.dmmf.datamodel.models.reduce((acc, model) => {
		const tableName = model.dbName ?? model.name;
		if (tableName) {
			acc[model.name] = tableName;
		}
		return acc;
	}, {});
}

function sanitizeValue(value, DecimalClass) {
	if (value === null || typeof value === "undefined") {
		return value ?? null;
	}

	if (value instanceof Date) {
		return value.toISOString();
	}

	if (typeof value === "bigint") {
		return Number(value);
	}

	if (DecimalClass && value instanceof DecimalClass) {
		if (typeof value.toNumber === "function") {
			return value.toNumber();
		}
		if (typeof value.toString === "function") {
			return value.toString();
		}
	}

	if (Array.isArray(value)) {
		return value.map((item) => sanitizeValue(item, DecimalClass));
	}

	if (typeof value === "object") {
		if (typeof value.toJSON === "function") {
			return value.toJSON();
		}

		return Object.entries(value).reduce((acc, [key, val]) => {
			acc[key] = sanitizeValue(val, DecimalClass);
			return acc;
		}, {});
	}

	return value;
}

function sanitizeRecord(record, DecimalClass) {
	if (!record || typeof record !== "object") {
		return record ?? null;
	}

	return sanitizeValue({ ...record }, DecimalClass);
}

function getPrismaDelegate(prisma, modelName) {
	if (!prisma || !modelName) {
		return null;
	}

	const delegateName = `${modelName.charAt(0).toLowerCase()}${modelName.slice(1)}`;
	const delegate = prisma[delegateName];

	if (!delegate || typeof delegate.findFirst !== "function") {
		return null;
	}

	return delegate;
}

async function fetchSnapshotByWhere({ prisma, modelName, where, DecimalClass }) {
	if (!where || typeof where !== "object") {
		return null;
	}

	const delegate = getPrismaDelegate(prisma, modelName);
	if (!delegate) {
		return null;
	}

	const record = await withActivityLoggingSuppressed(() => delegate.findFirst({ where }));
	return sanitizeRecord(record, DecimalClass);
}

async function fetchSnapshotsByWhere({ prisma, modelName, where, DecimalClass }) {
	if (!where || typeof where !== "object") {
		return [];
	}

	const delegate = getPrismaDelegate(prisma, modelName);
	if (!delegate || typeof delegate.findMany !== "function") {
		return [];
	}

	const records = await withActivityLoggingSuppressed(() => delegate.findMany({ where }));
	if (!Array.isArray(records)) {
		return [];
	}

	return records.map((record) => sanitizeRecord(record, DecimalClass));
}

async function fetchSnapshotsByIds({ prisma, modelName, ids, DecimalClass }) {
	if (!Array.isArray(ids) || ids.length === 0) {
		return [];
	}

	const delegate = getPrismaDelegate(prisma, modelName);
	if (!delegate || typeof delegate.findMany !== "function") {
		return [];
	}

	const uniqueIds = Array.from(new Set(ids));
	const records = await withActivityLoggingSuppressed(() =>
		delegate.findMany({
			where: {
				id: {
					in: uniqueIds
				}
			}
		})
	);

	if (!Array.isArray(records)) {
		return [];
	}

	return records.map((record) => sanitizeRecord(record, DecimalClass));
}

function extractEntityId(source) {
	if (source === null || typeof source === "undefined") {
		return null;
	}

	if (typeof source === "number" && Number.isFinite(source)) {
		return Math.trunc(source);
	}

	if (typeof source === "bigint") {
		return Number(source);
	}

	if (typeof source === "string") {
		const parsed = Number.parseInt(source, 10);
		return Number.isNaN(parsed) ? null : parsed;
	}

	if (Array.isArray(source)) {
		for (const candidate of source) {
			const extracted = extractEntityId(candidate);
			if (extracted !== null) {
				return extracted;
			}
		}
		return null;
	}

	if (typeof source === "object") {
		if (Object.prototype.hasOwnProperty.call(source, "id")) {
			return extractEntityId(source.id);
		}

		if (Object.prototype.hasOwnProperty.call(source, "where")) {
			return extractEntityId(source.where);
		}
	}

	return null;
}

function resolvesToSoftDelete(args) {
	if (!args || typeof args !== "object") {
		return false;
	}

	const data = args.data;
	if (!data || typeof data !== "object") {
		return false;
	}

	if (!Object.prototype.hasOwnProperty.call(data, "deletedAt")) {
		return false;
	}

	const deletedAt = data.deletedAt;
	if (deletedAt === null || typeof deletedAt === "undefined") {
		return false;
	}

	if (typeof deletedAt === "object" && deletedAt !== null && Object.prototype.hasOwnProperty.call(deletedAt, "set")) {
		return deletedAt.set !== null && typeof deletedAt.set !== "undefined";
	}

	return true;
}

function normalizeAction(action, args) {
	if (!action) {
		return null;
	}

	if (action === "update" && resolvesToSoftDelete(args)) {
		return "delete";
	}

	if (action === "updatemany" && resolvesToSoftDelete(args)) {
		return "deletemany";
	}

	return action;
}

function extractEntityIds(records = []) {
	if (!Array.isArray(records)) {
		return [];
	}

	return records
		.map((record) => extractEntityId(record))
		.filter((entityId) => typeof entityId === "number" && Number.isFinite(entityId));
}

async function fetchSnapshot({ prisma, tableName, entityId, DecimalClass }) {
	if (!tableName || !entityId) {
		return null;
	}

	const rows = await withActivityLoggingSuppressed(() =>
		prisma.$queryRawUnsafe(`SELECT row_to_json(t) AS data FROM "${tableName}" AS t WHERE id = $1 LIMIT 1`, entityId)
	);

	if (!Array.isArray(rows) || rows.length === 0) {
		return null;
	}

	const payload = rows[0]?.data ?? null;
	return sanitizeRecord(payload, DecimalClass);
}

function buildPayload({ action, tableName, entityId, before, after, context, allowNullEntityId = false, meta }) {
	if (!action || !tableName) {
		return null;
	}

	if (!allowNullEntityId && !entityId) {
		return null;
	}

	const actionLabel = `${action}_${tableName}`;
	const userId = context?.userId ?? context?.user?.id ?? null;
	const contextJson = {
		before: before ?? null,
		after: after ?? null
	};

	if (meta && typeof meta === "object") {
		contextJson.meta = meta;
	}

	return {
		userId,
		action: actionLabel,
		entityType: tableName,
		entityId: entityId ?? null,
		contextJson
	};
}

async function persistActivityLog(prisma, payload) {
	if (!payload) {
		return;
	}

	try {
		await withActivityLoggingSuppressed(() => prisma.activityLog.create({ data: payload }));
	} catch (error) {
		console.warn("Failed to persist activity log:", error.message);
	}
}

async function handleActivityLogging({ prisma, params, next, tableNameMap, DecimalClass }) {
	const context = getRequestContext();
	if (context?.skipActivityLogging) {
		return next(params);
	}

	const modelName = params.model;
	const rawAction = params.action?.toLowerCase();
	const normalizedAction = normalizeAction(rawAction, params.args);

	if (
		!modelName ||
		!normalizedAction ||
		(!CRUD_ACTIONS.has(normalizedAction) &&
			!BULK_ACTIONS.has(normalizedAction) &&
			normalizedAction !== UPSERT_ACTION) ||
		EXCLUDED_MODELS.has(modelName)
	) {
		return next(params);
	}

	const tableName = tableNameMap[modelName] ?? modelName;

	if (BULK_ACTIONS.has(normalizedAction)) {
		const baseAction = normalizedAction.replace("many", "");
		const where = params.args?.where;
		let beforeSnapshots = null;

		if (baseAction !== "create") {
			beforeSnapshots = await fetchSnapshotsByWhere({ prisma, modelName, where, DecimalClass });
		}

		const result = await next(params);
		const meta = {
			bulk: true,
			operation: normalizedAction,
			count: typeof result?.count === "number" ? result.count : null
		};

		let afterSnapshots = null;
		if (baseAction === "create") {
			afterSnapshots = sanitizeValue(params.args?.data ?? null, DecimalClass);
		} else if (baseAction === "update") {
			const ids = extractEntityIds(beforeSnapshots);
			afterSnapshots = await fetchSnapshotsByIds({ prisma, modelName, ids, DecimalClass });
			if (ids.length > 0) {
				meta.entityIds = ids;
			}
		} else if (baseAction === "delete") {
			const ids = extractEntityIds(beforeSnapshots);
			if (ids.length > 0) {
				meta.entityIds = ids;
			}
		}

		const ids = extractEntityIds(beforeSnapshots);
		const entityId = ids.length === 1 ? ids[0] : null;
		const payload = buildPayload({
			action: baseAction,
			tableName,
			entityId,
			before: baseAction === "create" ? null : beforeSnapshots,
			after: baseAction === "delete" ? null : afterSnapshots,
			context,
			allowNullEntityId: true,
			meta
		});

		await persistActivityLog(prisma, payload);
		return result;
	}

	let entityId = extractEntityId(params.args);
	let beforeSnapshot = null;

	if ((normalizedAction === "update" || normalizedAction === "delete" || normalizedAction === UPSERT_ACTION) && entityId) {
		beforeSnapshot = await fetchSnapshot({ prisma, tableName, entityId, DecimalClass });
	}

	if ((normalizedAction === "update" || normalizedAction === "delete" || normalizedAction === UPSERT_ACTION) && !beforeSnapshot) {
		const lookupSnapshot = await fetchSnapshotByWhere({
			prisma,
			modelName,
			where: params.args?.where,
			DecimalClass
		});
		if (lookupSnapshot) {
			beforeSnapshot = lookupSnapshot;
			if (!entityId) {
				entityId = extractEntityId(lookupSnapshot);
			}
		}
	}

	const result = await next(params);

	if (!entityId) {
		entityId = extractEntityId(result);
	}

	const resolvedAction =
		normalizedAction === UPSERT_ACTION ? (beforeSnapshot ? "update" : "create") : normalizedAction;

	if (!entityId && normalizedAction !== UPSERT_ACTION) {
		return result;
	}

	const afterSnapshot = resolvedAction === "delete" ? null : sanitizeRecord(result, DecimalClass);
	const payload = buildPayload({
		action: resolvedAction,
		tableName,
		entityId,
		before: resolvedAction === "create" ? null : beforeSnapshot,
		after: resolvedAction === "delete" ? null : afterSnapshot,
		context,
		allowNullEntityId: normalizedAction === UPSERT_ACTION
	});

	await persistActivityLog(prisma, payload);
	return result;
}

export function registerActivityLogMiddleware(prisma, { PrismaNamespace } = {}) {
	const prismaType = typeof prisma;
	const ctor = prisma && prisma.constructor ? prisma.constructor.name : undefined;
	const hasUse = prisma ? typeof prisma.$use === "function" : false;
	const hasExtends = prisma ? typeof prisma.$extends === "function" : false;

	if (!prisma) {
		console.warn("[ActivityLogMiddleware] prisma client missing", { prismaType, ctor });
		return prisma;
	}

	if (prisma._activityLogMiddlewareRegistered) {
		// Already wired
		return prisma;
	}

	const tableNameMap = buildModelTableMap(PrismaNamespace);
	const DecimalClass = PrismaNamespace?.Decimal ?? null;

	if (hasUse) {
		prisma.$use((params, next) => {
			const runner = () =>
				handleActivityLogging({
					prisma,
					params,
					next,
					tableNameMap,
					DecimalClass
				});

			if (getRequestContext()) {
				return runner();
			}

			return runWithRequestContext({ source: "prisma" }, runner);
		});

		prisma._activityLogMiddlewareRegistered = true;
		return prisma;
	}

	if (hasExtends) {
		const extended = prisma.$extends({
			query: {
				$allModels: {
					$allOperations({ model, operation, args, query }) {
						const params = { model, action: operation, args };
						const next = (overrideParams = params) => {
							const callArgs =
								overrideParams && Object.prototype.hasOwnProperty.call(overrideParams, "args")
									? overrideParams.args
									: args;
							return query(callArgs);
						};

						const runner = () =>
							handleActivityLogging({
								prisma,
								params,
								next,
								tableNameMap,
								DecimalClass
							});

						if (getRequestContext()) {
							return runner();
						}

						return runWithRequestContext({ source: "prisma" }, runner);
					}
				}
			}
		});

		extended._activityLogMiddlewareRegistered = true;
		return extended;
	}

	console.warn("[ActivityLogMiddleware] prisma client missing middleware hooks", {
		prismaType,
		ctor,
		hasUse,
		hasExtends
	});

	return prisma;
}
