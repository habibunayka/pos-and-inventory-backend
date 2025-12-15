const categoriesPaths = {
	"/api/categories": {
		"get": {
			"tags": [
				"Categories"
			],
			"summary": "Daftar semua kategori",
			"operationId": "listCategories",
			"responses": {
				"200": {
					"description": "Daftar kategori",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								"items": {
									"$ref": "#/components/schemas/Category"
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
				"Categories"
			],
			"summary": "Buat kategori",
			"operationId": "createCategory",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/CreateCategoryRequest"
						}
					}
				}
			},
			"responses": {
				"201": {
					"description": "Kategori dibuat",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Category"
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
	"/api/categories/{id}": {
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
				"Categories"
			],
			"summary": "Detail kategori",
			"operationId": "getCategory",
			"responses": {
				"200": {
					"description": "Detail kategori",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Category"
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
				"Categories"
			],
			"summary": "Perbarui kategori",
			"operationId": "updateCategory",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/UpdateCategoryRequest"
						}
					}
				}
			},
			"responses": {
				"200": {
					"description": "Kategori diperbarui",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Category"
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
				"Categories"
			],
			"summary": "Hapus kategori",
			"operationId": "deleteCategory",
			"responses": {
				"204": {
					"description": "Kategori dihapus"
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

export default categoriesPaths;
