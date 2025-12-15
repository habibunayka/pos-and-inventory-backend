const stockTransfersPaths = {
	"/api/stock-transfers": {
		"get": {
			"tags": [
				"StockTransfers"
			],
			"summary": "Daftar transfer stok",
			"operationId": "listStockTransfers",
			"responses": {
				"200": {
					"description": "Daftar transfer stok",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								"items": {
									"$ref": "#/components/schemas/StockTransfer"
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
				"StockTransfers"
			],
			"summary": "Buat transfer stok",
			"operationId": "createStockTransfer",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/CreateStockTransferRequest"
						}
					}
				}
			},
			"responses": {
				"201": {
					"description": "Transfer dibuat",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/StockTransfer"
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
	"/api/stock-transfers/{id}": {
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
				"StockTransfers"
			],
			"summary": "Detail transfer stok",
			"operationId": "getStockTransfer",
			"responses": {
				"200": {
					"description": "Detail transfer",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/StockTransfer"
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
				"StockTransfers"
			],
			"summary": "Hapus transfer stok",
			"operationId": "deleteStockTransfer",
			"responses": {
				"204": {
					"description": "Transfer dihapus"
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

export default stockTransfersPaths;
