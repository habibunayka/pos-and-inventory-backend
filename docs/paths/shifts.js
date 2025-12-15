const shiftsPaths = {
	"/api/shifts": {
		"get": {
			"tags": [
				"Shifts"
			],
			"summary": "Daftar konfigurasi shift",
			"operationId": "listShifts",
			"responses": {
				"200": {
					"description": "Daftar shift",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								"items": {
									"$ref": "#/components/schemas/Shift"
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
				"Shifts"
			],
			"summary": "Buat shift baru",
			"operationId": "createShift",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/CreateShiftRequest"
						}
					}
				}
			},
			"responses": {
				"201": {
					"description": "Shift dibuat",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Shift"
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
	"/api/shifts/{id}": {
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
				"Shifts"
			],
			"summary": "Detail shift",
			"operationId": "getShift",
			"responses": {
				"200": {
					"description": "Detail shift",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Shift"
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
				"Shifts"
			],
			"summary": "Update shift",
			"operationId": "updateShift",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/UpdateShiftRequest"
						}
					}
				}
			},
			"responses": {
				"200": {
					"description": "Shift diperbarui",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Shift"
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
				"Shifts"
			],
			"summary": "Hapus shift",
			"operationId": "deleteShift",
			"responses": {
				"204": {
					"description": "Shift dihapus"
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

export default shiftsPaths;
