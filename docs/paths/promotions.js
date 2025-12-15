const promotionsPaths = {
	"/api/promotions": {
		"get": {
			"tags": [
				"Promotions"
			],
			"summary": "Daftar promosi",
			"operationId": "listPromotions",
			"responses": {
				"200": {
					"description": "Daftar promosi",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								"items": {
									"$ref": "#/components/schemas/Promotion"
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
				"Promotions"
			],
			"summary": "Buat promosi",
			"operationId": "createPromotion",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/CreatePromotionRequest"
						}
					}
				}
			},
			"responses": {
				"201": {
					"description": "Promosi dibuat",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Promotion"
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
	"/api/promotions/{id}": {
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
				"Promotions"
			],
			"summary": "Detail promosi",
			"operationId": "getPromotion",
			"responses": {
				"200": {
					"description": "Detail promosi",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Promotion"
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
		"put": {
			"tags": [
				"Promotions"
			],
			"summary": "Perbarui promosi",
			"operationId": "updatePromotion",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/UpdatePromotionRequest"
						}
					}
				}
			},
			"responses": {
				"200": {
					"description": "Promosi diperbarui",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Promotion"
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
				"Promotions"
			],
			"summary": "Hapus promosi",
			"operationId": "deletePromotion",
			"responses": {
				"204": {
					"description": "Promosi dihapus"
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

export default promotionsPaths;
