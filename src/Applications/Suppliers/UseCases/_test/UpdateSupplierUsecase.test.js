import { jest } from "@jest/globals";
import UpdateSupplierUsecase from "../UpdateSupplierUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateSupplierUsecase", () => {
	let supplierService;
	let usecase;

	beforeEach(() => {
		supplierService = { getSupplier: jest.fn(), updateSupplier: jest.fn() };
		supplierService.getSupplier.mockResolvedValue({ id: 1, name: "Sup" });
		usecase = new UpdateSupplierUsecase({ supplierService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateSupplierUsecase()).toThrow("SUPPLIER_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("Invalid id"));
	});

	test("should throw when supplier not found", async () => {
		supplierService.getSupplier.mockResolvedValue(null);
		await expect(usecase.execute(1, { name: "New" })).rejects.toThrow(new ValidationError("Supplier not found"));
	});

	test("should throw when no updatable fields", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No updatable fields provided"));
	});

	test("should update supplier with normalized payload", async () => {
		const updated = { id: 1, name: "New" };
		supplierService.updateSupplier.mockResolvedValue(updated);

		const result = await usecase.execute("1", { name: " New ", address: "  ", phone: null, note: " note " });

		expect(supplierService.updateSupplier).toHaveBeenCalledWith({
			id: 1,
			data: { name: "New", address: null, phone: null, note: "note" }
		});
		expect(result).toEqual(updated);
	});
});
