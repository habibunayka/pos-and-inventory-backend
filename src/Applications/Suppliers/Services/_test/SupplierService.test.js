import { jest } from "@jest/globals";
import SupplierService from "../SupplierService.js";

describe("SupplierService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			findByName: jest.fn(),
			createSupplier: jest.fn(),
			updateSupplier: jest.fn(),
			deleteSupplier: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new SupplierService()).toThrow("SUPPLIER_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new SupplierService({ supplierRepository: badRepo })).toThrow(
			"SUPPLIER_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listSuppliers should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new SupplierService({ supplierRepository: mockRepo });

		const result = service.listSuppliers();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getSupplier should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new SupplierService({ supplierRepository: mockRepo });

		const result = service.getSupplier(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("getSupplierByName should delegate to repository", async () => {
		mockRepo.findByName.mockResolvedValue({ id: 3 });
		const service = new SupplierService({ supplierRepository: mockRepo });

		const result = service.getSupplierByName("abc");

		expect(mockRepo.findByName).toHaveBeenCalledWith("abc");
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("createSupplier should delegate to repository", async () => {
		mockRepo.createSupplier.mockResolvedValue({ id: 4 });
		const service = new SupplierService({ supplierRepository: mockRepo });

		const result = service.createSupplier({ name: "Sup" });

		expect(mockRepo.createSupplier).toHaveBeenCalledWith({ name: "Sup" });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("updateSupplier should delegate to repository", async () => {
		mockRepo.updateSupplier.mockResolvedValue({ id: 5 });
		const service = new SupplierService({ supplierRepository: mockRepo });

		const result = service.updateSupplier({ id: 5, data: { name: "New" } });

		expect(mockRepo.updateSupplier).toHaveBeenCalledWith({ id: 5, data: { name: "New" } });
		await expect(result).resolves.toEqual({ id: 5 });
	});

	test("deleteSupplier should delegate to repository", async () => {
		mockRepo.deleteSupplier.mockResolvedValue(true);
		const service = new SupplierService({ supplierRepository: mockRepo });

		const result = service.deleteSupplier(6);

		expect(mockRepo.deleteSupplier).toHaveBeenCalledWith(6);
		await expect(result).resolves.toBe(true);
	});
});
