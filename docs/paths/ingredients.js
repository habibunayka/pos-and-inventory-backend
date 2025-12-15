const ingredientsPaths = {
	"/api/ingredients": {
		"get": {
			"tags": [
				"Ingredients"
			],
			"summary": "Daftar semua bahan",
			"operationId": "listIngredients",
			"responses": {
				"200": {
					"description": "Daftar bahan berhasil diambil",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								"items": {
									"$ref": "#/components/schemas/Ingredient"
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
				"Ingredients"
			],
			"summary": "Buat bahan baru",
			"operationId": "createIngredient",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/CreateIngredientRequest"
						}
					}
				}
			},
			"responses": {
				"201": {
					"description": "Bahan berhasil dibuat",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Ingredient"
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
	"/api/ingredients/{id}": {
		"parameters": [
			{
				"name": "id",
				"in": "path",
				"required": true,
				"description": "ID bahan",
				"schema": {
					"type": "integer",
					"minimum": 1
				}
			}
		],
		"get": {
			"tags": [
				"Ingredients"
			],
			"summary": "Ambil detail bahan",
			"operationId": "getIngredient",
			"responses": {
				"200": {
					"description": "Detail bahan",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Ingredient"
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
				"Ingredients"
			],
			"summary": "Perbarui bahan",
			"operationId": "updateIngredient",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/UpdateIngredientRequest"
						}
					}
				}
			},
			"responses": {
				"200": {
					"description": "Bahan diperbarui",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Ingredient"
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
				"Ingredients"
			],
			"summary": "Hapus bahan",
			"operationId": "deleteIngredient",
			"responses": {
				"204": {
					"description": "Bahan dihapus"
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

export default ingredientsPaths;
