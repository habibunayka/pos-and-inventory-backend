const kitchenOrdersPaths = {
	"/api/kitchen-orders": {
		get: {
			tags: ["KitchenOrders"],
			summary: "Daftar kitchen order",
			operationId: "listKitchenOrders",
			responses: {
				200: {
					description: "Daftar KO",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/KitchenOrder"
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
			tags: ["KitchenOrders"],
			summary: "Buat kitchen order",
			operationId: "createKitchenOrder",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateKitchenOrderRequest"
						}
					}
				}
			},
			responses: {
				201: {
					description: "Kitchen order dibuat",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/KitchenOrder"
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
	"/api/kitchen-orders/{id}": {
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
			tags: ["KitchenOrders"],
			summary: "Detail kitchen order",
			operationId: "getKitchenOrder",
			responses: {
				200: {
					description: "Detail KO",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/KitchenOrder"
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
			tags: ["KitchenOrders"],
			summary: "Perbarui kitchen order",
			operationId: "updateKitchenOrder",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/UpdateKitchenOrderRequest"
						}
					}
				}
			},
			responses: {
				200: {
					description: "KO diperbarui",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/KitchenOrder"
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
			tags: ["KitchenOrders"],
			summary: "Hapus kitchen order",
			operationId: "deleteKitchenOrder",
			responses: {
				204: {
					description: "KO dihapus"
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

export default kitchenOrdersPaths;
