const transactionItemsPaths = {
	"/api/transaction-items": {
		"get": {
			"tags": [
				"TransactionItems"
			],
			"summary": "Daftar item transaksi",
			"operationId": "listTransactionItems",
			"responses": {
				"200": {
					"description": "Daftar item transaksi",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								"items": {
									"$ref": "#/components/schemas/TransactionItem"
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
				"TransactionItems"
			],
			"summary": "Buat item transaksi",
			"operationId": "createTransactionItem",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/CreateTransactionItemRequest"
						}
					}
				}
			},
			"responses": {
				"201": {
					"description": "Item dibuat",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/TransactionItem"
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
	"/api/transaction-items/{id}": {
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
				"TransactionItems"
			],
			"summary": "Detail item transaksi",
			"operationId": "getTransactionItem",
			"responses": {
				"200": {
					"description": "Detail item",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/TransactionItem"
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
				"TransactionItems"
			],
			"summary": "Perbarui item transaksi",
			"operationId": "updateTransactionItem",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/UpdateTransactionItemRequest"
						}
					}
				}
			},
			"responses": {
				"200": {
					"description": "Item diperbarui",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/TransactionItem"
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
				"TransactionItems"
			],
			"summary": "Hapus item transaksi",
			"operationId": "deleteTransactionItem",
			"responses": {
				"204": {
					"description": "Item dihapus"
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

export default transactionItemsPaths;
