import { jest } from "@jest/globals";
import ListSupplierProductsUsecase from "../ListSupplierProductsUsecase.js";

describe("ListSupplierProductsUsecase", () => {
	let supplierProductService;
	let usecase;

	beforeEach(() => {
		supplierProductService = { listSupplierProducts: jest.fn() };
		usecase = new ListSupplierProductsUsecase({ supplierProductService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListSupplierProductsUsecase()).toThrow("SUPPLIER_PRODUCT_USECASE.MISSING_SERVICE");
	});

	test("should list supplier products", async () => {
		const records = [{ id: 1 }];
		supplierProductService.listSupplierProducts.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(supplierProductService.listSupplierProducts).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
