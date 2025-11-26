import { jest } from "@jest/globals";
import DeleteSupplierUsecase from "../DeleteSupplierUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteSupplierUsecase", () => {
	let supplierService;
	let usecase;

	beforeEach(() => {
		supplierService = { deleteSupplier: jest.fn() };
		usecase = new DeleteSupplierUsecase({ supplierService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteSupplierUsecase()).toThrow("SUPPLIER_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when deletion fails", async () => {
		supplierService.deleteSupplier.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Supplier not found"));
	});

	test("should delete supplier", async () => {
		supplierService.deleteSupplier.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(supplierService.deleteSupplier).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
