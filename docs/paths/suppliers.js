const suppliersPaths = {
	"/api/suppliers": {
		"get": {
			"tags": [
				"Suppliers"
			],
			"summary": "Daftar semua pemasok",
			"operationId": "listSuppliers",
			"responses": {
				"200": {
					"description": "Daftar pemasok berhasil diambil",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								"items": {
									"$ref": "#/components/schemas/Supplier"
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
				"Suppliers"
			],
			"summary": "Buat pemasok baru",
			"operationId": "createSupplier",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/CreateSupplierRequest"
						}
					}
				}
			},
			"responses": {
				"201": {
					"description": "Pemasok dibuat",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Supplier"
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
	"/api/suppliers/{id}": {
		"parameters": [
			{
				"name": "id",
				"in": "path",
				"required": true,
				"description": "ID pemasok",
				"schema": {
					"type": "integer",
					"minimum": 1
				}
			}
		],
		"get": {
			"tags": [
				"Suppliers"
			],
			"summary": "Detail pemasok",
			"operationId": "getSupplier",
			"responses": {
				"200": {
					"description": "Detail pemasok",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Supplier"
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
				"Suppliers"
			],
			"summary": "Perbarui pemasok",
			"operationId": "updateSupplier",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/UpdateSupplierRequest"
						}
					}
				}
			},
			"responses": {
				"200": {
					"description": "Pemasok diperbarui",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Supplier"
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
				"Suppliers"
			],
			"summary": "Hapus pemasok",
			"operationId": "deleteSupplier",
			"responses": {
				"204": {
					"description": "Pemasok dihapus"
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

export default suppliersPaths;
