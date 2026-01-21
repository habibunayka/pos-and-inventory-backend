import { describe, expect, it } from "@jest/globals";
import Supplier from "../Supplier.js";
import SupplierProduct from "../SupplierProduct.js";

describe("Supplier entity branch coverage", () => {
	it.each([Supplier, SupplierProduct])("returns null when persistence record is missing for %p", (Entity) => {
		expect(Entity.fromPersistence(null)).toBeNull();
	});

	it("Supplier applies null fallbacks", () => {
		const entity = Supplier.fromPersistence({ name: "Vendor" });
		expect(entity).toMatchObject({
			contactName: null,
			phone: null,
			email: null,
			address: null
		});
	});

	it("SupplierProduct handles optional numeric fields", () => {
		const entity = SupplierProduct.fromPersistence({
			supplierId: 1,
			ingredientId: 2,
			packageId: 3,
			price: 10
		});
		expect(entity).toMatchObject({ id: null, leadTime: null, isActive: true });
	});

	describe("constructor default branches", () => {
		const cases = [
			{
				Entity: Supplier,
				props: { name: "Supplier" },
				expected: { contactName: null, phone: null, email: null, address: null }
			},
			{
				Entity: SupplierProduct,
				props: { supplierId: 1, ingredientId: 2, packageId: 3, qty: 4, price: 5 },
				expected: { leadTime: null, isActive: true }
			}
		];

		it.each(cases)("applies defaults for %p", ({ Entity, props, expected }) => {
			const entity = new Entity(props);
			expect(entity).toBeInstanceOf(Entity);
			expect(entity).toMatchObject(expected);
		});
	});
});
