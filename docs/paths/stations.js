const stationsPaths = {
	"/api/stations": {
		"get": {
			"tags": [
				"Stations"
			],
			"summary": "Daftar stasiun/kasir",
			"operationId": "listStations",
			"responses": {
				"200": {
					"description": "Daftar station POS",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								"items": {
									"$ref": "#/components/schemas/Station"
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
				"Stations"
			],
			"summary": "Buat stasiun/kasir baru",
			"operationId": "createStation",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/CreateStationRequest"
						}
					}
				}
			},
			"responses": {
				"201": {
					"description": "Station dibuat",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Station"
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
	"/api/stations/{id}": {
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
				"Stations"
			],
			"summary": "Detail station",
			"operationId": "getStation",
			"responses": {
				"200": {
					"description": "Detail station POS",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Station"
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
				"Stations"
			],
			"summary": "Update station",
			"operationId": "updateStation",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/UpdateStationRequest"
						}
					}
				}
			},
			"responses": {
				"200": {
					"description": "Station diperbarui",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Station"
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
				"Stations"
			],
			"summary": "Hapus station",
			"operationId": "deleteStation",
			"responses": {
				"204": {
					"description": "Station dihapus"
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

export default stationsPaths;
