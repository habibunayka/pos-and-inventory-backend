const deliveryIntegrationsPaths = {
	"/api/delivery-integrations": {
		"get": {
			"tags": [
				"DeliveryIntegrations"
			],
			"summary": "Daftar integrasi delivery",
			"operationId": "listDeliveryIntegrations",
			"responses": {
				"200": {
					"description": "Daftar integrasi",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								"items": {
									"$ref": "#/components/schemas/DeliveryIntegration"
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
				"DeliveryIntegrations"
			],
			"summary": "Buat integrasi delivery",
			"operationId": "createDeliveryIntegration",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/CreateDeliveryIntegrationRequest"
						}
					}
				}
			},
			"responses": {
				"201": {
					"description": "Integrasi dibuat",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/DeliveryIntegration"
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
	"/api/delivery-integrations/{id}": {
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
				"DeliveryIntegrations"
			],
			"summary": "Detail integrasi",
			"operationId": "getDeliveryIntegration",
			"responses": {
				"200": {
					"description": "Detail integrasi",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/DeliveryIntegration"
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
				"DeliveryIntegrations"
			],
			"summary": "Perbarui integrasi",
			"operationId": "updateDeliveryIntegration",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/UpdateDeliveryIntegrationRequest"
						}
					}
				}
			},
			"responses": {
				"200": {
					"description": "Integrasi diperbarui",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/DeliveryIntegration"
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
				"DeliveryIntegrations"
			],
			"summary": "Hapus integrasi",
			"operationId": "deleteDeliveryIntegration",
			"responses": {
				"204": {
					"description": "Integrasi dihapus"
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

export default deliveryIntegrationsPaths;
