import { describe, expect, it } from "@jest/globals";
import MenuPrice from "../MenuPrice.js";

describe("MenuPrice", () => {
	it("returns null when record is missing", () => {
		expect(MenuPrice.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			menuId: "menuId-value-2",
			price: "price-value-3",
			effectiveDate: "effectiveDate-value-4"
		};

		const entity = MenuPrice.fromPersistence(record);

		expect(entity).toBeInstanceOf(MenuPrice);
		expect(entity).toMatchObject({
			id: "id-value-1",
			menuId: "menuId-value-2",
			price: "price-value-3",
			effectiveDate: "effectiveDate-value-4"
		});
	});
});
