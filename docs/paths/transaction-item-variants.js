const transactionItemVariantsPaths = {
	"/api/transaction-item-variants": {
		get: {
			tags: ["TransactionItemVariants"],
			summary: "Daftar varian item",
			operationId: "listTransactionItemVariants",
			responses: {
				200: {
					description: "Daftar varian",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/TransactionItemVariant"
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
			tags: ["TransactionItemVariants"],
			summary: "Buat varian item",
			operationId: "createTransactionItemVariant",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateTransactionItemVariantRequest"
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
								$ref: "#/components/schemas/TransactionItemVariant"
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
	"/api/transaction-item-variants/{id}": {
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
			tags: ["TransactionItemVariants"],
			summary: "Detail varian item",
			operationId: "getTransactionItemVariant",
			responses: {
				200: {
					description: "Detail varian",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/TransactionItemVariant"
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
			tags: ["TransactionItemVariants"],
			summary: "Hapus varian item",
			operationId: "deleteTransactionItemVariant",
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

export default transactionItemVariantsPaths;
