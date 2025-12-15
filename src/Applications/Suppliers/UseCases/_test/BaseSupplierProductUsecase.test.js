import { jest } from "@jest/globals";
import BaseSupplierProductUsecase from "../BaseSupplierProductUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseSupplierProductUsecase {}

describe("BaseSupplierProductUsecase", () => {
	let supplierService;
	let ingredientService;
	let packageService;

	beforeEach(() => {
		supplierService = { getSupplier: jest.fn() };
		ingredientService = { getIngredient: jest.fn() };
		packageService = { getPackage: jest.fn() };
	});

	test("should throw when supplierProductService missing", () => {
		expect(() => new BaseSupplierProductUsecase()).toThrow("SUPPLIER_PRODUCT_USECASE.MISSING_SERVICE");
	});

	test("_validateSupplierId should validate and check existence", async () => {
		supplierService.getSupplier.mockResolvedValue({ id: 1 });
		const usecase = new DummyUsecase({
			supplierProductService: {},
			supplierService,
			ingredientService,
			packageService
		});

		await expect(usecase._validateSupplierId("1")).resolves.toBe(1);
		expect(supplierService.getSupplier).toHaveBeenCalledWith(1);
	});

	test("_validateSupplierId should throw when invalid or not found", async () => {
		const usecase = new DummyUsecase({ supplierProductService: {}, supplierService, ingredientService, packageService });
		await expect(usecase._validateSupplierId("abc")).rejects.toThrow(
			new ValidationError("supplierId must be a positive integer")
		);
		supplierService.getSupplier.mockResolvedValue(null);
		await expect(usecase._validateSupplierId(1)).rejects.toThrow(new ValidationError("supplierId not found"));
	});

	test("_validateIngredientId should validate and check existence", async () => {
		ingredientService.getIngredient.mockResolvedValue({ id: 2 });
		const usecase = new DummyUsecase({ supplierProductService: {}, supplierService, ingredientService, packageService });

		await expect(usecase._validateIngredientId("2")).resolves.toBe(2);
		expect(ingredientService.getIngredient).toHaveBeenCalledWith(2);
	});

	test("_validateIngredientId should reject invalid values", async () => {
		const usecase = new DummyUsecase({ supplierProductService: {}, supplierService, ingredientService, packageService });

		await expect(usecase._validateIngredientId("abc")).rejects.toThrow(
			new ValidationError("ingredientId must be a positive integer")
		);
	});

	test("_validatePackageId should validate and check existence", async () => {
		packageService.getPackage.mockResolvedValue({ id: 3 });
		const usecase = new DummyUsecase({ supplierProductService: {}, supplierService, ingredientService, packageService });

		await expect(usecase._validatePackageId("3")).resolves.toBe(3);
		expect(packageService.getPackage).toHaveBeenCalledWith(3);
	});

	test("_validatePackageId should reject invalid or missing package", async () => {
		const usecase = new DummyUsecase({ supplierProductService: {}, supplierService, ingredientService, packageService });

		await expect(usecase._validatePackageId("abc")).rejects.toThrow(
			new ValidationError("packageId must be a positive integer")
		);

		packageService.getPackage.mockResolvedValue(null);
		await expect(usecase._validatePackageId(2)).rejects.toThrow(new ValidationError("packageId not found"));
	});

	test("validator methods bypass existence checks when services missing", async () => {
		const usecase = new DummyUsecase({
			supplierProductService: {},
			supplierService: null,
			ingredientService: null,
			packageService: null
		});

		await expect(usecase._validateSupplierId(1)).resolves.toBe(1);
		await expect(usecase._validateIngredientId(2)).resolves.toBe(2);
		await expect(usecase._validatePackageId(3)).resolves.toBe(3);
	});

	test("_validateIngredientId should throw when ingredient not found", async () => {
		const usecase = new DummyUsecase({ supplierProductService: {}, supplierService, ingredientService, packageService });
		ingredientService.getIngredient.mockResolvedValue(null);

		await expect(usecase._validateIngredientId(2)).rejects.toThrow(new ValidationError("ingredientId not found"));
	});
});
