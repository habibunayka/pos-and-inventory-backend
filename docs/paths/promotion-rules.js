const promotionRulesPaths = {
	"/api/promotion-rules": {
		"get": {
			"tags": [
				"PromotionRules"
			],
			"summary": "Daftar aturan promosi",
			"operationId": "listPromotionRules",
			"responses": {
				"200": {
					"description": "Daftar aturan promosi",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								"items": {
									"$ref": "#/components/schemas/PromotionRule"
								}
							}
						}
					}
				},
				"500": {
					"$ref": "#/components/responses/InternalServerError"
				}
			}
		},
		"post": {
			"tags": [
				"PromotionRules"
			],
			"summary": "Buat aturan promosi",
			"operationId": "createPromotionRule",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/CreatePromotionRuleRequest"
						}
					}
				}
			},
			"responses": {
				"201": {
					"description": "Aturan dibuat",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/PromotionRule"
							}
						}
					}
				},
				"400": {
					"$ref": "#/components/responses/BadRequest"
				},
				"500": {
					"$ref": "#/components/responses/InternalServerError"
				}
			}
		}
	},
	"/api/promotion-rules/{id}": {
		"parameters": [
			{
				"name": "id",
				"in": "path",
				"required": true,
				"schema": {
					"type": "integer",
					"minimum": 1
				}
			}
		],
		"get": {
			"tags": [
				"PromotionRules"
			],
			"summary": "Detail aturan promosi",
			"operationId": "getPromotionRule",
			"responses": {
				"200": {
					"description": "Detail aturan promosi",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/PromotionRule"
							}
						}
					}
				},
				"400": {
					"$ref": "#/components/responses/BadRequest"
				},
				"404": {
					"$ref": "#/components/responses/NotFound"
				},
				"500": {
					"$ref": "#/components/responses/InternalServerError"
				}
			}
		},
		"delete": {
			"tags": [
				"PromotionRules"
			],
			"summary": "Hapus aturan promosi",
			"operationId": "deletePromotionRule",
			"responses": {
				"204": {
					"description": "Aturan dihapus"
				},
				"400": {
					"$ref": "#/components/responses/BadRequest"
				},
				"404": {
					"$ref": "#/components/responses/NotFound"
				},
				"500": {
					"$ref": "#/components/responses/InternalServerError"
				}
			}
		}
	}
};

export default promotionRulesPaths;
