const ingredientPackagesPaths = {
	"/api/ingredient-packages": {
		get: {
			tags: ["IngredientPackages"],
			summary: "Daftar relasi bahan-kemasan",
			operationId: "listIngredientPackages",
			responses: {
				200: {
					description: "Daftar relasi berhasil diambil",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/IngredientPackage"
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
			tags: ["IngredientPackages"],
			summary: "Buat relasi bahan-kemasan",
			operationId: "createIngredientPackage",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateIngredientPackageRequest"
						}
					}
				}
			},
			responses: {
				201: {
					description: "Relasi dibuat",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/IngredientPackage"
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
	"/api/ingredient-packages/{id}": {
		parameters: [
			{
				name: "id",
				in: "path",
				required: true,
				description: "ID relasi",
				schema: {
					type: "integer",
					minimum: 1
				}
			}
		],
		get: {
			tags: ["IngredientPackages"],
			summary: "Detail relasi",
			operationId: "getIngredientPackage",
			responses: {
				200: {
					description: "Detail relasi",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/IngredientPackage"
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
			tags: ["IngredientPackages"],
			summary: "Perbarui relasi",
			operationId: "updateIngredientPackage",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/UpdateIngredientPackageRequest"
						}
					}
				}
			},
			responses: {
				200: {
					description: "Relasi diperbarui",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/IngredientPackage"
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
			tags: ["IngredientPackages"],
			summary: "Hapus relasi",
			operationId: "deleteIngredientPackage",
			responses: {
				204: {
					description: "Relasi dihapus"
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

export default ingredientPackagesPaths;
