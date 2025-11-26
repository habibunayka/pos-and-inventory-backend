import * as supplierProductsIndex from "../supplierProductsIndex.js";
import ListSupplierProductsUsecase from "../ListSupplierProductsUsecase.js";
import GetSupplierProductUsecase from "../GetSupplierProductUsecase.js";
import CreateSupplierProductUsecase from "../CreateSupplierProductUsecase.js";
import UpdateSupplierProductUsecase from "../UpdateSupplierProductUsecase.js";
import DeleteSupplierProductUsecase from "../DeleteSupplierProductUsecase.js";

describe("supplierProductsIndex exports", () => {
	test("should export supplier product usecases", () => {
		expect(supplierProductsIndex.ListSupplierProductsUsecase).toBe(ListSupplierProductsUsecase);
		expect(supplierProductsIndex.GetSupplierProductUsecase).toBe(GetSupplierProductUsecase);
		expect(supplierProductsIndex.CreateSupplierProductUsecase).toBe(CreateSupplierProductUsecase);
		expect(supplierProductsIndex.UpdateSupplierProductUsecase).toBe(UpdateSupplierProductUsecase);
		expect(supplierProductsIndex.DeleteSupplierProductUsecase).toBe(DeleteSupplierProductUsecase);
	});
});
