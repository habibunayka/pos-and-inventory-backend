import { jest } from "@jest/globals";
import PackageService from "../PackageService.js";

describe("PackageService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createPackage: jest.fn(),
			updatePackage: jest.fn(),
			deletePackage: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new PackageService()).toThrow("PACKAGE_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new PackageService({ packageRepository: badRepo })).toThrow(
			"PACKAGE_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listPackages should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new PackageService({ packageRepository: mockRepo });

		const result = service.listPackages();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getPackage should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new PackageService({ packageRepository: mockRepo });

		const result = service.getPackage(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createPackage should delegate to repository", async () => {
		mockRepo.createPackage.mockResolvedValue({ id: 3 });
		const service = new PackageService({ packageRepository: mockRepo });

		const result = service.createPackage({ name: "Box" });

		expect(mockRepo.createPackage).toHaveBeenCalledWith({ name: "Box" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updatePackage should delegate to repository", async () => {
		mockRepo.updatePackage.mockResolvedValue({ id: 4 });
		const service = new PackageService({ packageRepository: mockRepo });

		const result = service.updatePackage({ id: 4, data: { name: "New" } });

		expect(mockRepo.updatePackage).toHaveBeenCalledWith({ id: 4, data: { name: "New" } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deletePackage should delegate to repository", async () => {
		mockRepo.deletePackage.mockResolvedValue(true);
		const service = new PackageService({ packageRepository: mockRepo });

		const result = service.deletePackage(5);

		expect(mockRepo.deletePackage).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});

	test("getPackageByName should throw when repository cannot search by name", async () => {
		const service = new PackageService({ packageRepository: { ...mockRepo, findByName: undefined } });

		expect(() => service.getPackageByName("box")).toThrow(
			"PACKAGE_SERVICE.REPOSITORY_MISSING_FIND_BY_NAME"
		);
	});

	test("getPackageByName should delegate when repository supports lookup", async () => {
		mockRepo.findByName = jest.fn().mockResolvedValue({ id: 9 });
		const service = new PackageService({ packageRepository: mockRepo });

		const result = service.getPackageByName("crate");

		expect(mockRepo.findByName).toHaveBeenCalledWith("crate");
		await expect(result).resolves.toEqual({ id: 9 });
	});
});
