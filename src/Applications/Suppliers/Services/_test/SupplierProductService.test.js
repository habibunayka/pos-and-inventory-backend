import { jest } from "@jest/globals";
import SupplierProductService from "../SupplierProductService.js";

describe("SupplierProductService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createSupplierProduct: jest.fn(),
			updateSupplierProduct: jest.fn(),
			deleteSupplierProduct: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new SupplierProductService()).toThrow("SUPPLIER_PRODUCT_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new SupplierProductService({ supplierProductRepository: badRepo })).toThrow(
			"SUPPLIER_PRODUCT_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listSupplierProducts should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new SupplierProductService({ supplierProductRepository: mockRepo });

		const result = service.listSupplierProducts();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getSupplierProduct should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new SupplierProductService({ supplierProductRepository: mockRepo });

		const result = service.getSupplierProduct(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createSupplierProduct should delegate to repository", async () => {
		mockRepo.createSupplierProduct.mockResolvedValue({ id: 3 });
		const service = new SupplierProductService({ supplierProductRepository: mockRepo });

		const result = service.createSupplierProduct({ name: "Prod" });

		expect(mockRepo.createSupplierProduct).toHaveBeenCalledWith({ name: "Prod" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updateSupplierProduct should delegate to repository", async () => {
		mockRepo.updateSupplierProduct.mockResolvedValue({ id: 4 });
		const service = new SupplierProductService({ supplierProductRepository: mockRepo });

		const result = service.updateSupplierProduct({ id: 4, data: { name: "New" } });

		expect(mockRepo.updateSupplierProduct).toHaveBeenCalledWith({ id: 4, data: { name: "New" } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deleteSupplierProduct should delegate to repository", async () => {
		mockRepo.deleteSupplierProduct.mockResolvedValue(true);
		const service = new SupplierProductService({ supplierProductRepository: mockRepo });

		const result = service.deleteSupplierProduct(5);

		expect(mockRepo.deleteSupplierProduct).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
