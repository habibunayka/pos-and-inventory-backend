const tablesPaths = {
	"/api/tables": {
		get: {
			tags: ["Tables"],
			summary: "Daftar semua meja",
			operationId: "listTables",
			responses: {
				200: {
					description: "Daftar meja berhasil diambil",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/Table"
								}
							}
						}
					}
				},
				500: {
					$ref: "#/components/responses/InternalServerError"
				}
			}
		},
		post: {
			tags: ["Tables"],
			summary: "Buat meja baru",
			operationId: "createTable",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateTableRequest"
						}
					}
				}
			},
			responses: {
				201: {
					description: "Meja berhasil dibuat",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Table"
							}
						}
					}
				},
				400: {
					$ref: "#/components/responses/BadRequest"
				},
				500: {
					$ref: "#/components/responses/InternalServerError"
				}
			}
		}
	},
	"/api/tables/{id}": {
		parameters: [
			{
				name: "id",
				in: "path",
				required: true,
				description: "ID meja",
				schema: {
					type: "integer",
					minimum: 1
				}
			}
		],
		get: {
			tags: ["Tables"],
			summary: "Ambil detail meja",
			operationId: "getTable",
			responses: {
				200: {
					description: "Detail meja",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Table"
							}
						}
					}
				},
				400: {
					$ref: "#/components/responses/BadRequest"
				},
				404: {
					$ref: "#/components/responses/NotFound"
				},
				500: {
					$ref: "#/components/responses/InternalServerError"
				}
			}
		},
		put: {
			tags: ["Tables"],
			summary: "Perbarui meja",
			operationId: "updateTable",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/UpdateTableRequest"
						}
					}
				}
			},
			responses: {
				200: {
					description: "Meja diperbarui",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Table"
							}
						}
					}
				},
				400: {
					$ref: "#/components/responses/BadRequest"
				},
				404: {
					$ref: "#/components/responses/NotFound"
				},
				500: {
					$ref: "#/components/responses/InternalServerError"
				}
			}
		},
		delete: {
			tags: ["Tables"],
			summary: "Hapus meja",
			operationId: "deleteTable",
			responses: {
				204: {
					description: "Meja dihapus"
				},
				400: {
					$ref: "#/components/responses/BadRequest"
				},
				404: {
					$ref: "#/components/responses/NotFound"
				},
				500: {
					$ref: "#/components/responses/InternalServerError"
				}
			}
		}
	}
};

export default tablesPaths;
