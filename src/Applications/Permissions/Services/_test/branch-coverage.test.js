import { describe, expect, it } from "@jest/globals";
import PermissionService from "../PermissionService.js";
import PermissionRepository from "../../../../Domains/Permissions/Repositories/PermissionRepository.js";

describe("PermissionService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new PermissionRepository();
		const service = new PermissionService({ permissionRepository: repo });
		expect(service).toBeInstanceOf(PermissionService);
	});
});
