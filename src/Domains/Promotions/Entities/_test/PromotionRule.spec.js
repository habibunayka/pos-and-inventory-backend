import { describe, expect, it } from "@jest/globals";
import PromotionRule from "../PromotionRule.js";

describe("PromotionRule", () => {
	it("returns null when record is missing", () => {
		expect(PromotionRule.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			promotionId: "promotionId-value-2",
			ruleType: "ruleType-value-3",
			value: "value-value-4"
		};

		const entity = PromotionRule.fromPersistence(record);

		expect(entity).toBeInstanceOf(PromotionRule);
		expect(entity).toMatchObject({
			id: "id-value-1",
			promotionId: "promotionId-value-2",
			ruleType: "ruleType-value-3",
			value: "value-value-4"
		});
	});
});
