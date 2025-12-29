const wastesPaths = {
	"/api/wastes": {
		get: {
			tags: ["Wastes"],
			summary: "Daftar waste",
			operationId: "listWastes",
			responses: {
				200: {
					description: "Daftar waste",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/Waste"
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
			tags: ["Wastes"],
			summary: "Buat waste",
			operationId: "createWaste",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateWasteRequest"
						}
					}
				}
			},
			responses: {
				201: {
					description: "Waste dibuat",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Waste"
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
	"/api/wastes/{id}": {
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
			tags: ["Wastes"],
			summary: "Detail waste",
			operationId: "getWaste",
			responses: {
				200: {
					description: "Detail waste",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Waste"
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
			tags: ["Wastes"],
			summary: "Perbarui waste",
			operationId: "updateWaste",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/UpdateWasteRequest"
						}
					}
				}
			},
			responses: {
				200: {
					description: "Waste diperbarui",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Waste"
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
			tags: ["Wastes"],
			summary: "Hapus waste",
			operationId: "deleteWaste",
			responses: {
				204: {
					description: "Waste dihapus"
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

export default wastesPaths;
