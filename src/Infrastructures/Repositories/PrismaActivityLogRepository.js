import ActivityLog from "../../Domains/Logs/Entities/ActivityLog.js";
import ActivityLogRepository from "../../Domains/Logs/Repositories/ActivityLogRepository.js";

export default class PrismaActivityLogRepository extends ActivityLogRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_ACTIVITYLOG_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.activityLog.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => ActivityLog.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.activityLog.findFirst({ where: { id, deletedAt: null } });
		return ActivityLog.fromPersistence(record);
	}

	async createActivityLog(data) {
		const record = await this._prisma.activityLog.create({ data });
		return ActivityLog.fromPersistence(record);
	}

	async deleteActivityLog(id) {
		const existing = await this._prisma.activityLog.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.activityLog.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
