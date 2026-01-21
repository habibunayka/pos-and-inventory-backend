import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreateSupplierProductUsecase from "../CreateSupplierProductUsecase.js";
import UpdateSupplierProductUsecase from "../UpdateSupplierProductUsecase.js";
import UpdateSupplierUsecase from "../UpdateSupplierUsecase.js";

describe("Suppliers usecase branch coverage", () => {
	it("CreateSupplierProductUsecase default arg branch", async () => {
		const usecase = new CreateSupplierProductUsecase({
			supplierService: null,
			ingredientService: null,
			packageService: null,
			supplierProductService: {}
		});
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateSupplierProductUsecase handles leadTime and isActive defaults", async () => {
		const supplierProductService = { createSupplierProduct: jest.fn().mockResolvedValue({}) };
		const usecase = new CreateSupplierProductUsecase({
			supplierService: null,
			ingredientService: null,
			packageService: null,
			supplierProductService
		});

		await usecase.execute({ supplierId: 1, ingredientId: 2, packageId: 3, qty: 1, price: 0 });
		expect(supplierProductService.createSupplierProduct).toHaveBeenCalledWith(
			expect.objectContaining({ leadTime: null, isActive: true })
		);

		await usecase.execute({
			supplierId: 1,
			ingredientId: 2,
			packageId: 3,
			qty: 2,
			price: 5,
			leadTime: 4,
			isActive: false
		});
		expect(supplierProductService.createSupplierProduct).toHaveBeenLastCalledWith(
			expect.objectContaining({ leadTime: 4, isActive: false })
		);
	});

	it("UpdateSupplierProductUsecase handles default payload", async () => {
		const supplierProductService = {
			getSupplierProduct: jest.fn().mockResolvedValue({ id: 1 }),
			updateSupplierProduct: jest.fn()
		};
		const usecase = new UpdateSupplierProductUsecase({ supplierProductService });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);
	});

	it("UpdateSupplierUsecase handles default payload", async () => {
		const supplierService = { getSupplier: jest.fn().mockResolvedValue({ id: 1 }), updateSupplier: jest.fn() };
		const usecase = new UpdateSupplierUsecase({ supplierService });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);
	});
});
