import { describe, expect, it } from "@jest/globals";
import RoleService from "../RoleService.js";
import RoleRepository from "../../../../Domains/Roles/Repositories/RoleRepository.js";

describe("RoleService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new RoleRepository();
		const service = new RoleService({ roleRepository: repo });
		expect(service).toBeInstanceOf(RoleService);
	});
});
