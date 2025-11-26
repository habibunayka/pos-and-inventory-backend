import { jest } from "@jest/globals";
import CreateSupplierUsecase from "../CreateSupplierUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateSupplierUsecase", () => {
	let supplierService;
	let usecase;

	beforeEach(() => {
		supplierService = { createSupplier: jest.fn() };
		usecase = new CreateSupplierUsecase({ supplierService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateSupplierUsecase()).toThrow("SUPPLIER_USECASE.MISSING_SERVICE");
	});

	test("should throw when name missing", async () => {
		await expect(usecase.execute({ name: "   " })).rejects.toThrow(new ValidationError("name is required"));
	});

	test("should create supplier with normalized payload", async () => {
		const created = { id: 1 };
		supplierService.createSupplier.mockResolvedValue(created);

		const result = await usecase.execute({
			name: " Supplier ",
			address: "  ",
			phone: null,
			note: "  note "
		});

		expect(supplierService.createSupplier).toHaveBeenCalledWith({
			name: "Supplier",
			address: null,
			phone: null,
			note: "note"
		});
		expect(result).toEqual(created);
	});
});
