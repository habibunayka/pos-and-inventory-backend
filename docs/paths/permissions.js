const permissionsPaths = {
	"/api/permissions": {
		"get": {
			"tags": [
				"Permissions"
			],
			"summary": "Daftar semua permission",
			"operationId": "listPermissions",
			"responses": {
				"200": {
					"description": "Daftar permission berhasil diambil",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								"items": {
									"$ref": "#/components/schemas/Permission"
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
				"Permissions"
			],
			"summary": "Buat permission",
			"operationId": "createPermission",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/CreatePermissionRequest"
						}
					}
				}
			},
			"responses": {
				"201": {
					"description": "Permission dibuat",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Permission"
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
	"/api/permissions/{id}": {
		"parameters": [
			{
				"name": "id",
				"in": "path",
				"required": true,
				"description": "ID permission",
				"schema": {
					"type": "integer",
					"minimum": 1
				}
			}
		],
		"get": {
			"tags": [
				"Permissions"
			],
			"summary": "Detail permission",
			"operationId": "getPermission",
			"responses": {
				"200": {
					"description": "Detail permission",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Permission"
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
				"Permissions"
			],
			"summary": "Perbarui permission",
			"operationId": "updatePermission",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/UpdatePermissionRequest"
						}
					}
				}
			},
			"responses": {
				"200": {
					"description": "Permission diperbarui",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/Permission"
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
				"Permissions"
			],
			"summary": "Hapus permission",
			"operationId": "deletePermission",
			"responses": {
				"204": {
					"description": "Permission dihapus"
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

export default permissionsPaths;
