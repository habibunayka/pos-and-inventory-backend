import { jest } from "@jest/globals";
import ListSuppliersUsecase from "../ListSuppliersUsecase.js";

describe("ListSuppliersUsecase", () => {
	let supplierService;
	let usecase;

	beforeEach(() => {
		supplierService = { listSuppliers: jest.fn() };
		usecase = new ListSuppliersUsecase({ supplierService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListSuppliersUsecase()).toThrow("SUPPLIER_USECASE.MISSING_SERVICE");
	});

	test("should list suppliers", async () => {
		const records = [{ id: 1 }];
		supplierService.listSuppliers.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(supplierService.listSuppliers).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
