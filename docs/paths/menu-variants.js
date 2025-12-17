const menuVariantsPaths = {
	"/api/menu-variants": {
		get: {
			tags: ["MenuVariants"],
			summary: "Daftar varian menu",
			operationId: "listMenuVariants",
			responses: {
				200: {
					description: "Daftar varian",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/MenuVariant"
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
			tags: ["MenuVariants"],
			summary: "Buat varian menu",
			operationId: "createMenuVariant",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateMenuVariantRequest"
						}
					}
				}
			},
			responses: {
				201: {
					description: "Varian dibuat",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/MenuVariant"
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
	"/api/menu-variants/{id}": {
		parameters: [
			{
				name: "id",
				in: "path",
				required: true,
				schema: {
					type: "integer",
					minimum: 1
				}
			}
		],
		get: {
			tags: ["MenuVariants"],
			summary: "Detail varian",
			operationId: "getMenuVariant",
			responses: {
				200: {
					description: "Detail varian",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/MenuVariant"
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
			tags: ["MenuVariants"],
			summary: "Perbarui varian",
			operationId: "updateMenuVariant",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/UpdateMenuVariantRequest"
						}
					}
				}
			},
			responses: {
				200: {
					description: "Varian diperbarui",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/MenuVariant"
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
			tags: ["MenuVariants"],
			summary: "Hapus varian",
			operationId: "deleteMenuVariant",
			responses: {
				204: {
					description: "Varian dihapus"
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

export default menuVariantsPaths;
