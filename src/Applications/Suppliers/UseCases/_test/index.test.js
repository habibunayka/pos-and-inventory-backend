import * as usecases from "../index.js";
import ListSuppliersUsecase from "../ListSuppliersUsecase.js";
import GetSupplierUsecase from "../GetSupplierUsecase.js";
import CreateSupplierUsecase from "../CreateSupplierUsecase.js";
import UpdateSupplierUsecase from "../UpdateSupplierUsecase.js";
import DeleteSupplierUsecase from "../DeleteSupplierUsecase.js";
import * as supplierProductsIndex from "../supplierProductsIndex.js";
import ListSupplierProductsUsecase from "../ListSupplierProductsUsecase.js";
import GetSupplierProductUsecase from "../GetSupplierProductUsecase.js";
import CreateSupplierProductUsecase from "../CreateSupplierProductUsecase.js";
import UpdateSupplierProductUsecase from "../UpdateSupplierProductUsecase.js";
import DeleteSupplierProductUsecase from "../DeleteSupplierProductUsecase.js";

describe("Suppliers Usecases index exports", () => {
	test("should export supplier usecases", () => {
		expect(usecases.ListSuppliersUsecase).toBe(ListSuppliersUsecase);
		expect(usecases.GetSupplierUsecase).toBe(GetSupplierUsecase);
		expect(usecases.CreateSupplierUsecase).toBe(CreateSupplierUsecase);
		expect(usecases.UpdateSupplierUsecase).toBe(UpdateSupplierUsecase);
		expect(usecases.DeleteSupplierUsecase).toBe(DeleteSupplierUsecase);
	});

	test("should export supplier product usecases", () => {
		expect(supplierProductsIndex.ListSupplierProductsUsecase).toBe(ListSupplierProductsUsecase);
		expect(supplierProductsIndex.GetSupplierProductUsecase).toBe(GetSupplierProductUsecase);
		expect(supplierProductsIndex.CreateSupplierProductUsecase).toBe(CreateSupplierProductUsecase);
		expect(supplierProductsIndex.UpdateSupplierProductUsecase).toBe(UpdateSupplierProductUsecase);
		expect(supplierProductsIndex.DeleteSupplierProductUsecase).toBe(DeleteSupplierProductUsecase);
	});
});
