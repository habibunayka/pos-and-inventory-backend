const menuPricesPaths = {
	"/api/menu-prices": {
		get: {
			tags: ["MenuPrices"],
			summary: "Daftar harga menu",
			operationId: "listMenuPrices",
			responses: {
				200: {
					description: "Daftar harga",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/MenuPrice"
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
			tags: ["MenuPrices"],
			summary: "Buat harga menu",
			operationId: "createMenuPrice",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateMenuPriceRequest"
						}
					}
				}
			},
			responses: {
				201: {
					description: "Harga dibuat",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/MenuPrice"
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
	"/api/menu-prices/{id}": {
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
			tags: ["MenuPrices"],
			summary: "Detail harga menu",
			operationId: "getMenuPrice",
			responses: {
				200: {
					description: "Detail harga",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/MenuPrice"
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
			tags: ["MenuPrices"],
			summary: "Perbarui harga menu",
			operationId: "updateMenuPrice",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/UpdateMenuPriceRequest"
						}
					}
				}
			},
			responses: {
				200: {
					description: "Harga diperbarui",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/MenuPrice"
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
			tags: ["MenuPrices"],
			summary: "Hapus harga menu",
			operationId: "deleteMenuPrice",
			responses: {
				204: {
					description: "Harga dihapus"
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

export default menuPricesPaths;
