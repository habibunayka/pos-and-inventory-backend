const UpdatePromotionRuleRequest = {
	type: "object",
	minProperties: 1,
	properties: {
		promotionId: {
			type: "integer",
			example: 1
		},
		ruleType: {
			type: "string",
			nullable: true,
			example: "amount_discount"
		},
		value: {
			type: "string",
			nullable: true,
			example: "5000"
		}
	}
};

export default UpdatePromotionRuleRequest;
