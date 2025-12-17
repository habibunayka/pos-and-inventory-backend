const unitsPaths = {
	"/api/units": {
		get: {
			tags: ["Units"],
			summary: "Daftar semua unit",
			operationId: "listUnits",
			responses: {
				200: {
					description: "Daftar unit berhasil diambil",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/Unit"
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
			tags: ["Units"],
			summary: "Buat unit baru",
			operationId: "createUnit",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateUnitRequest"
						}
					}
				}
			},
			responses: {
				201: {
					description: "Unit berhasil dibuat",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Unit"
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
	"/api/units/{id}": {
		parameters: [
			{
				name: "id",
				in: "path",
				required: true,
				description: "ID unit",
				schema: {
					type: "integer",
					minimum: 1
				}
			}
		],
		get: {
			tags: ["Units"],
			summary: "Ambil detail unit",
			operationId: "getUnit",
			responses: {
				200: {
					description: "Detail unit",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Unit"
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
			tags: ["Units"],
			summary: "Perbarui unit",
			operationId: "updateUnit",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/UpdateUnitRequest"
						}
					}
				}
			},
			responses: {
				200: {
					description: "Unit diperbarui",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Unit"
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
			tags: ["Units"],
			summary: "Hapus unit",
			operationId: "deleteUnit",
			responses: {
				204: {
					description: "Unit dihapus"
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

export default unitsPaths;
