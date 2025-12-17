const placesPaths = {
	"/api/places": {
		get: {
			tags: ["Places"],
			summary: "Daftar semua tempat",
			operationId: "listPlaces",
			responses: {
				200: {
					description: "Daftar tempat berhasil diambil",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/Place"
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
			tags: ["Places"],
			summary: "Buat tempat baru",
			operationId: "createPlace",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreatePlaceRequest"
						}
					}
				}
			},
			responses: {
				201: {
					description: "Tempat berhasil dibuat",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Place"
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
	"/api/places/{id}": {
		parameters: [
			{
				name: "id",
				in: "path",
				required: true,
				description: "ID tempat",
				schema: {
					type: "integer",
					minimum: 1
				}
			}
		],
		get: {
			tags: ["Places"],
			summary: "Ambil detail tempat",
			operationId: "getPlace",
			responses: {
				200: {
					description: "Detail tempat ditemukan",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Place"
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
			tags: ["Places"],
			summary: "Perbarui data tempat",
			operationId: "updatePlace",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/UpdatePlaceRequest"
						}
					}
				}
			},
			responses: {
				200: {
					description: "Tempat berhasil diperbarui",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Place"
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
			tags: ["Places"],
			summary: "Hapus tempat",
			operationId: "deletePlace",
			responses: {
				204: {
					description: "Tempat berhasil dihapus"
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

export default placesPaths;
