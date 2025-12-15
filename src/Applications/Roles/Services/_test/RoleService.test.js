import { jest } from "@jest/globals";
import RoleService from "../RoleService.js";

describe("RoleService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			findByName: jest.fn(),
			findPermissionsByNames: jest.fn(),
			createRole: jest.fn(),
			updateRole: jest.fn(),
			deleteRole: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new RoleService()).toThrow("ROLE_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new RoleService({ roleRepository: badRepo })).toThrow(
			"ROLE_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listRoles should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new RoleService({ roleRepository: mockRepo });

		const result = service.listRoles();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getRoleById should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new RoleService({ roleRepository: mockRepo });

		const result = service.getRoleById(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("getRoleByName should delegate to repository", async () => {
		mockRepo.findByName.mockResolvedValue({ id: 3 });
		const service = new RoleService({ roleRepository: mockRepo });

		const result = service.getRoleByName("admin");

		expect(mockRepo.findByName).toHaveBeenCalledWith("admin");
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("findPermissionsByNames should delegate to repository", async () => {
		mockRepo.findPermissionsByNames.mockResolvedValue(["read"]);
		const service = new RoleService({ roleRepository: mockRepo });

		const result = service.findPermissionsByNames(["read"]);

		expect(mockRepo.findPermissionsByNames).toHaveBeenCalledWith(["read"]);
		await expect(result).resolves.toEqual(["read"]);
	});

	test("createRole should delegate to repository", async () => {
		mockRepo.createRole.mockResolvedValue({ id: 4 });
		const service = new RoleService({ roleRepository: mockRepo });

		const result = service.createRole({ name: "admin" });

		expect(mockRepo.createRole).toHaveBeenCalledWith({ name: "admin" });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("updateRole should delegate to repository", async () => {
		mockRepo.updateRole.mockResolvedValue({ id: 5 });
		const service = new RoleService({ roleRepository: mockRepo });

		const result = service.updateRole({ id: 5, data: { name: "staff" } });

		expect(mockRepo.updateRole).toHaveBeenCalledWith({ id: 5, data: { name: "staff" } });
		await expect(result).resolves.toEqual({ id: 5 });
	});

	test("deleteRole should delegate to repository", async () => {
		mockRepo.deleteRole.mockResolvedValue(true);
		const service = new RoleService({ roleRepository: mockRepo });

		const result = service.deleteRole(6);

		expect(mockRepo.deleteRole).toHaveBeenCalledWith(6);
		await expect(result).resolves.toBe(true);
	});
});
