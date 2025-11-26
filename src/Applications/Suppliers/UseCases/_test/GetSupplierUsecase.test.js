import { jest } from "@jest/globals";
import GetSupplierUsecase from "../GetSupplierUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetSupplierUsecase", () => {
	let supplierService;
	let usecase;

	beforeEach(() => {
		supplierService = { getSupplier: jest.fn() };
		usecase = new GetSupplierUsecase({ supplierService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetSupplierUsecase()).toThrow("SUPPLIER_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when supplier not found", async () => {
		supplierService.getSupplier.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Supplier not found"));
	});

	test("should return supplier when found", async () => {
		supplierService.getSupplier.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(supplierService.getSupplier).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
