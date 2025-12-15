import { jest } from "@jest/globals";
import GetSupplierProductUsecase from "../GetSupplierProductUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetSupplierProductUsecase", () => {
	let supplierProductService;
	let usecase;

	beforeEach(() => {
		supplierProductService = { getSupplierProduct: jest.fn() };
		usecase = new GetSupplierProductUsecase({ supplierProductService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetSupplierProductUsecase()).toThrow("SUPPLIER_PRODUCT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when supplier product not found", async () => {
		supplierProductService.getSupplierProduct.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Supplier product not found"));
	});

	test("should return supplier product when found", async () => {
		supplierProductService.getSupplierProduct.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(supplierProductService.getSupplierProduct).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
