import { describe, expect, it } from "@jest/globals";
import Promotion from "../Promotion.js";
import PromotionRule from "../PromotionRule.js";

describe("Promotion entity branch coverage", () => {
	it.each([Promotion, PromotionRule])("returns null when persistence record is missing for %p", (Entity) => {
		expect(Entity.fromPersistence(null)).toBeNull();
	});

	it("Promotion honors optional numeric defaults", () => {
		const entity = Promotion.fromPersistence({
			name: "Promo"
		});
		expect(entity).toMatchObject({ id: null, placeId: null, startAt: null, endAt: null });
	});

	it("PromotionRule falls back to nullables", () => {
		const entity = PromotionRule.fromPersistence({ promotionId: 1 });
		expect(entity).toMatchObject({ id: null, ruleType: null, value: null });
	});

	describe("constructor default branches", () => {
		const cases = [
			{ Entity: Promotion, props: { name: "Promo" }, expected: { placeId: null, startAt: null, endAt: null } },
			{ Entity: PromotionRule, props: { promotionId: 1 }, expected: { ruleType: null, value: null } }
		];

		it.each(cases)("applies defaults for %p", ({ Entity, props, expected }) => {
			const entity = new Entity(props);
			expect(entity).toBeInstanceOf(Entity);
			expect(entity).toMatchObject(expected);
		});
	});
});
