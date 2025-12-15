import { jest } from "@jest/globals";
import DeleteSupplierProductUsecase from "../DeleteSupplierProductUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteSupplierProductUsecase", () => {
	let supplierProductService;
	let usecase;

	beforeEach(() => {
		supplierProductService = { deleteSupplierProduct: jest.fn() };
		usecase = new DeleteSupplierProductUsecase({ supplierProductService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteSupplierProductUsecase()).toThrow("SUPPLIER_PRODUCT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when deletion fails", async () => {
		supplierProductService.deleteSupplierProduct.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Supplier product not found"));
	});

	test("should delete supplier product", async () => {
		supplierProductService.deleteSupplierProduct.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(supplierProductService.deleteSupplierProduct).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
