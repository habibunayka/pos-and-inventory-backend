const CreatePromotionRuleRequest = {
  "type": "object",
  "required": [
    "promotionId"
  ],
  "properties": {
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

export default CreatePromotionRuleRequest;
