const supplierProductsPaths = {
	"/api/supplier-products": {
		"get": {
			"tags": [
				"SupplierProducts"
			],
			"summary": "Daftar semua produk pemasok",
			"operationId": "listSupplierProducts",
			"responses": {
				"200": {
					"description": "Daftar produk pemasok berhasil diambil",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								"items": {
									"$ref": "#/components/schemas/SupplierProduct"
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
				"SupplierProducts"
			],
			"summary": "Buat produk pemasok",
			"operationId": "createSupplierProduct",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/CreateSupplierProductRequest"
						}
					}
				}
			},
			"responses": {
				"201": {
					"description": "Produk pemasok dibuat",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/SupplierProduct"
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
	"/api/supplier-products/{id}": {
		"parameters": [
			{
				"name": "id",
				"in": "path",
				"required": true,
				"description": "ID produk pemasok",
				"schema": {
					"type": "integer",
					"minimum": 1
				}
			}
		],
		"get": {
			"tags": [
				"SupplierProducts"
			],
			"summary": "Detail produk pemasok",
			"operationId": "getSupplierProduct",
			"responses": {
				"200": {
					"description": "Detail produk pemasok",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/SupplierProduct"
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
				"SupplierProducts"
			],
			"summary": "Perbarui produk pemasok",
			"operationId": "updateSupplierProduct",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/UpdateSupplierProductRequest"
						}
					}
				}
			},
			"responses": {
				"200": {
					"description": "Produk pemasok diperbarui",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/SupplierProduct"
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
				"SupplierProducts"
			],
			"summary": "Hapus produk pemasok",
			"operationId": "deleteSupplierProduct",
			"responses": {
				"204": {
					"description": "Produk pemasok dihapus"
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

export default supplierProductsPaths;
