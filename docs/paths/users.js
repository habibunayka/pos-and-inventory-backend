const usersPaths = {
	"/api/users": {
		"get": {
			"tags": [
				"Users"
			],
			"summary": "Daftar semua pengguna",
			"operationId": "listUsers",
			"responses": {
				"200": {
					"description": "Daftar pengguna berhasil diambil",
					"content": {
						"application/json": {
							"schema": {
								"type": "array",
								"items": {
									"$ref": "#/components/schemas/User"
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
				"Users"
			],
			"summary": "Buat pengguna baru",
			"operationId": "createUser",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/CreateUserRequest"
						}
					}
				},
				"description": "Jika role adalah cashier maka gunakan PIN (tanpa email & password). Untuk role lain gunakan email & password (tanpa PIN)."
			},
			"responses": {
				"201": {
					"description": "Pengguna berhasil dibuat",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/User"
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
	"/api/users/{id}": {
		"parameters": [
			{
				"name": "id",
				"in": "path",
				"required": true,
				"description": "ID pengguna",
				"schema": {
					"type": "integer",
					"minimum": 1
				}
			}
		],
		"get": {
			"tags": [
				"Users"
			],
			"summary": "Ambil detail pengguna",
			"operationId": "getUser",
			"responses": {
				"200": {
					"description": "Detail pengguna ditemukan",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/User"
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
		"patch": {
			"tags": [
				"Users"
			],
			"summary": "Perbarui data pengguna",
			"operationId": "updateUser",
			"requestBody": {
				"required": true,
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/UpdateUserRequest"
						}
					}
				},
				"description": "Isi hanya properti yang ingin diubah. Validasi berbeda untuk role cashier dan non-cashier."
			},
			"responses": {
				"200": {
					"description": "Pengguna berhasil diperbarui",
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/User"
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
		}
	}
};

export default usersPaths;
