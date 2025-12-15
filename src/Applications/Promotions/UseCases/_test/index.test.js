import * as usecases from "../index.js";
import ListPromotionsUsecase from "../promotions/ListPromotionsUsecase.js";
import GetPromotionUsecase from "../promotions/GetPromotionUsecase.js";
import CreatePromotionUsecase from "../promotions/CreatePromotionUsecase.js";
import UpdatePromotionUsecase from "../promotions/UpdatePromotionUsecase.js";
import DeletePromotionUsecase from "../promotions/DeletePromotionUsecase.js";
import ListPromotionRulesUsecase from "../promotionRules/ListPromotionRulesUsecase.js";
import GetPromotionRuleUsecase from "../promotionRules/GetPromotionRuleUsecase.js";
import CreatePromotionRuleUsecase from "../promotionRules/CreatePromotionRuleUsecase.js";
import DeletePromotionRuleUsecase from "../promotionRules/DeletePromotionRuleUsecase.js";

describe("Promotions Usecases index exports", () => {
	test("should export promotion usecases", () => {
		expect(usecases.ListPromotionsUsecase).toBe(ListPromotionsUsecase);
		expect(usecases.GetPromotionUsecase).toBe(GetPromotionUsecase);
		expect(usecases.CreatePromotionUsecase).toBe(CreatePromotionUsecase);
		expect(usecases.UpdatePromotionUsecase).toBe(UpdatePromotionUsecase);
		expect(usecases.DeletePromotionUsecase).toBe(DeletePromotionUsecase);
	});

	test("should export promotion rule usecases", () => {
		expect(usecases.ListPromotionRulesUsecase).toBe(ListPromotionRulesUsecase);
		expect(usecases.GetPromotionRuleUsecase).toBe(GetPromotionRuleUsecase);
		expect(usecases.CreatePromotionRuleUsecase).toBe(CreatePromotionRuleUsecase);
		expect(usecases.DeletePromotionRuleUsecase).toBe(DeletePromotionRuleUsecase);
	});
});
