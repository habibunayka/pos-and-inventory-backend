import { describe, expect, it } from "@jest/globals";
import SupplierProduct from "../SupplierProduct.js";

describe("SupplierProduct", () => {
	it("returns null when record is missing", () => {
		expect(SupplierProduct.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			supplierId: "supplierId-value-2",
			ingredientId: "ingredientId-value-3",
			packageId: "packageId-value-4",
			qty: "qty-value-5",
			price: "price-value-6",
			leadTime: "leadTime-value-7",
			isActive: "isActive-value-8"
		};

		const entity = SupplierProduct.fromPersistence(record);

		expect(entity).toBeInstanceOf(SupplierProduct);
		expect(entity).toMatchObject({
			id: "id-value-1",
			supplierId: "supplierId-value-2",
			ingredientId: "ingredientId-value-3",
			packageId: "packageId-value-4",
			qty: "qty-value-5",
			price: "price-value-6",
			leadTime: "leadTime-value-7",
			isActive: "isActive-value-8"
		});
	});

});
