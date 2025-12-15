import {
	PERMISSION_GROUPS,
	STANDALONE_PERMISSIONS,
	buildPermissionAliasMap,
	buildPermissionCatalog,
	expandPermissionsWithAliases
} from "../PermissionMatrix.js";

describe("PermissionMatrix helpers", () => {
	let originalGroups;
	let originalStandalones;

	beforeEach(() => {
		originalGroups = structuredClone(PERMISSION_GROUPS);
		originalStandalones = structuredClone(STANDALONE_PERMISSIONS);
	});

	afterEach(() => {
		PERMISSION_GROUPS.length = 0;
		PERMISSION_GROUPS.push(...structuredClone(originalGroups));

		STANDALONE_PERMISSIONS.length = 0;
		STANDALONE_PERMISSIONS.push(...structuredClone(originalStandalones));
	});

	test("buildPermissionAliasMap handles missing names and actions", () => {
		PERMISSION_GROUPS.push({ manage: { name: "manage_misc" }, actions: null });
		PERMISSION_GROUPS.push({
			manage: null,
			actions: [{ key: "no-name" }, { name: "custom_action" }]
		});

		const map = buildPermissionAliasMap();

		expect(map.get("view_menus")).toEqual(["manage_menus"]);
		expect(map.get("custom_action")).toEqual([]);
		expect(map.has("no-name")).toBe(false);
	});

	test("expandPermissionsWithAliases normalizes, expands, and ignores invalid entries", () => {
		expect(expandPermissionsWithAliases()).toEqual(new Set());

		const existing = expandPermissionsWithAliases(["view_menus"]);
		expect(existing.has("view_menus")).toBe(true);

		const expanded = expandPermissionsWithAliases([" manage_menus ", "not_real", 123]);
		expect(expanded.has("manage_menus")).toBe(true);
		expect(expanded.has("view_menus")).toBe(true);
		expect(expanded.has("not_real")).toBe(true);
	});

	test("buildPermissionCatalog deduplicates and skips invalid entries", () => {
		PERMISSION_GROUPS.push({
			manage: { name: "manage_extra", description: "extra manage" },
			actions: [
				{ name: "extra_action", description: "first" },
				{ name: "extra_action", description: "duplicate" }
			]
		});
		PERMISSION_GROUPS.push({ manage: { name: "manage_no_actions", description: "no actions" }, actions: null });
		STANDALONE_PERMISSIONS.push({ description: "missing name" });

		const catalog = buildPermissionCatalog();

		expect(catalog.find((entry) => entry.name === "manage_extra")?.description).toBe("extra manage");
		expect(catalog.find((entry) => entry.name === "manage_no_actions")).toBeDefined();
		expect(catalog.filter((entry) => entry.name === "extra_action")).toHaveLength(1);
		expect(catalog.find((entry) => entry.name === "manage_company_profile")).toBeDefined();
		expect(catalog.find((entry) => entry.description === "missing name")).toBeUndefined();
	});
});
