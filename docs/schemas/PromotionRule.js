const PromotionRule = {
	"type": "object",
	"required": [
		"id",
		"promotionId"
	],
	"properties": {
		"id": {
			"type": "integer",
			"example": 1
		},
		"promotionId": {
			"type": "integer",
			"example": 1
		},
		"ruleType": {
			"type": "string",
			"nullable": true,
			"example": "percentage_discount"
		},
		"value": {
			"type": "string",
			"nullable": true,
			"example": "10"
		}
	}
};

export default PromotionRule;
