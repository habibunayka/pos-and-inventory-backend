const placeStocksPaths = {
	"/api/place-stocks": {
		"get": {
			"tags": [
				"PlaceStocks"
			],
			"summary": "Daftar place stocks",
			"operationId": "listPlaceStocks",
			"responses": {
				"200": {
					"description": "Daftar place stocks",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								"items": {
									"$ref": "#/components/schemas/PlaceStock"
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
				"PlaceStocks"
			],
			"summary": "Buat place stock",
			"operationId": "createPlaceStock",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/CreatePlaceStockRequest"
						}
					}
				}
			},
			"responses": {
				"201": {
					"description": "Place stock dibuat",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/PlaceStock"
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
	"/api/place-stocks/{id}": {
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
				"PlaceStocks"
			],
			"summary": "Detail place stock",
			"operationId": "getPlaceStock",
			"responses": {
				"200": {
					"description": "Detail place stock",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/PlaceStock"
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
				"PlaceStocks"
			],
			"summary": "Perbarui place stock",
			"operationId": "updatePlaceStock",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/UpdatePlaceStockRequest"
						}
					}
				}
			},
			"responses": {
				"200": {
					"description": "Place stock diperbarui",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/PlaceStock"
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
				"PlaceStocks"
			],
			"summary": "Hapus place stock",
			"operationId": "deletePlaceStock",
			"responses": {
				"204": {
					"description": "Place stock dihapus"
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

export default placeStocksPaths;
