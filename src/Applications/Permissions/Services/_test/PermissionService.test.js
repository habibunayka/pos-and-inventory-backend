import { jest } from "@jest/globals";
import PermissionService from "../PermissionService.js";

describe("PermissionService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			findByName: jest.fn(),
			createPermission: jest.fn(),
			updatePermission: jest.fn(),
			deletePermission: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new PermissionService()).toThrow("PERMISSION_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new PermissionService({ permissionRepository: badRepo })).toThrow(
			"PERMISSION_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listPermissions should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new PermissionService({ permissionRepository: mockRepo });

		const result = service.listPermissions();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getPermission should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new PermissionService({ permissionRepository: mockRepo });

		const result = service.getPermission(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("getPermissionByName should delegate to repository", async () => {
		mockRepo.findByName.mockResolvedValue({ id: 3 });
		const service = new PermissionService({ permissionRepository: mockRepo });

		const result = service.getPermissionByName("read");

		expect(mockRepo.findByName).toHaveBeenCalledWith("read");
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("createPermission should delegate to repository", async () => {
		mockRepo.createPermission.mockResolvedValue({ id: 4 });
		const service = new PermissionService({ permissionRepository: mockRepo });

		const result = service.createPermission({ name: "write" });

		expect(mockRepo.createPermission).toHaveBeenCalledWith({ name: "write" });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("updatePermission should delegate to repository", async () => {
		mockRepo.updatePermission.mockResolvedValue({ id: 5 });
		const service = new PermissionService({ permissionRepository: mockRepo });

		const result = service.updatePermission({ id: 5, data: { name: "read" } });

		expect(mockRepo.updatePermission).toHaveBeenCalledWith({ id: 5, data: { name: "read" } });
		await expect(result).resolves.toEqual({ id: 5 });
	});

	test("deletePermission should delegate to repository", async () => {
		mockRepo.deletePermission.mockResolvedValue(true);
		const service = new PermissionService({ permissionRepository: mockRepo });

		const result = service.deletePermission(6);

		expect(mockRepo.deletePermission).toHaveBeenCalledWith(6);
		await expect(result).resolves.toBe(true);
	});
});
