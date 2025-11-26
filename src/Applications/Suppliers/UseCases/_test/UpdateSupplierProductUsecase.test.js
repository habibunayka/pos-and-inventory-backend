import { jest } from "@jest/globals";
import UpdateSupplierProductUsecase from "../UpdateSupplierProductUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateSupplierProductUsecase", () => {
	let supplierProductService;
	let supplierService;
	let ingredientService;
	let packageService;
	let usecase;

	beforeEach(() => {
		supplierProductService = { updateSupplierProduct: jest.fn(), getSupplierProduct: jest.fn() };
		supplierService = { getSupplier: jest.fn().mockResolvedValue({ id: 1 }) };
		ingredientService = { getIngredient: jest.fn().mockResolvedValue({ id: 2 }) };
		packageService = { getPackage: jest.fn().mockResolvedValue({ id: 3 }) };
		supplierProductService.getSupplierProduct.mockResolvedValue({ id: 1, supplierId: 1, ingredientId: 2, packageId: 3 });
		usecase = new UpdateSupplierProductUsecase({
			supplierProductService,
			supplierService,
			ingredientService,
			packageService
		});
	});

	test("should throw when service missing", () => {
		expect(() => new UpdateSupplierProductUsecase()).toThrow("SUPPLIER_PRODUCT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when payload not object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when record not found", async () => {
		supplierProductService.getSupplierProduct.mockResolvedValue(null);

		await expect(usecase.execute(1, { qty: 1 })).rejects.toThrow(new ValidationError("Supplier product not found"));
	});

	test("should throw when qty invalid", async () => {
		await expect(usecase.execute(1, { qty: "abc" })).rejects.toThrow(new ValidationError("qty must be a positive number"));
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No updatable fields provided"));
	});

	test("should update supplier product with validated ids", async () => {
		const updated = { id: 1 };
		supplierProductService.updateSupplierProduct.mockResolvedValue(updated);

		const result = await usecase.execute("1", {
			supplierId: "1",
			ingredientId: "2",
			packageId: "3",
			qty: "4",
			price: "5",
			leadTime: 2.3,
			isActive: true
		});

		expect(supplierProductService.updateSupplierProduct).toHaveBeenCalledWith({
			id: 1,
			data: {
				supplierId: 1,
				ingredientId: 2,
				packageId: 3,
				qty: 4,
				price: 5,
				leadTime: 2,
				isActive: true
			}
		});
		expect(result).toEqual(updated);
	});
});
