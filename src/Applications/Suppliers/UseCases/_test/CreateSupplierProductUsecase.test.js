import { jest } from "@jest/globals";
import CreateSupplierProductUsecase from "../CreateSupplierProductUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateSupplierProductUsecase", () => {
	let supplierProductService;
	let supplierService;
	let ingredientService;
	let packageService;
	let usecase;

	beforeEach(() => {
		supplierProductService = { createSupplierProduct: jest.fn() };
		supplierService = { getSupplier: jest.fn().mockResolvedValue({ id: 1 }) };
		ingredientService = { getIngredient: jest.fn().mockResolvedValue({ id: 2 }) };
		packageService = { getPackage: jest.fn().mockResolvedValue({ id: 3 }) };
		usecase = new CreateSupplierProductUsecase({
			supplierProductService,
			supplierService,
			ingredientService,
			packageService
		});
	});

	test("should throw when service missing", () => {
		expect(() => new CreateSupplierProductUsecase()).toThrow("SUPPLIER_PRODUCT_USECASE.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when qty invalid", async () => {
		await expect(usecase.execute({ supplierId: 1, ingredientId: 2, packageId: 3, qty: "abc", price: 1 })).rejects.toThrow(
			new ValidationError("qty must be a positive number")
		);
	});

	test("should throw when price invalid", async () => {
		await expect(usecase.execute({ supplierId: 1, ingredientId: 2, packageId: 3, qty: 1, price: -1 })).rejects.toThrow(
			new ValidationError("price must be a non-negative number")
		);
	});

test("should create supplier product with validated ids", async () => {
const created = { id: 1 };
supplierProductService.createSupplierProduct.mockResolvedValue(created);

const result = await usecase.execute({
supplierId: "1",
ingredientId: "2",
packageId: "3",
qty: "4",
price: "5",
leadTime: 2.8,
isActive: false
});

expect(supplierProductService.createSupplierProduct).toHaveBeenCalledWith({
supplierId: 1,
ingredientId: 2,
packageId: 3,
qty: 4,
price: 5,
leadTime: 2,
isActive: false
});
expect(result).toEqual(created);
});
});
