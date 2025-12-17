const paymentMethodsPaths = {
	"/api/payment-methods": {
		get: {
			tags: ["PaymentMethods"],
			summary: "Daftar metode pembayaran",
			operationId: "listPaymentMethods",
			responses: {
				200: {
					description: "Daftar metode",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/PaymentMethod"
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
			tags: ["PaymentMethods"],
			summary: "Buat metode pembayaran",
			operationId: "createPaymentMethod",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreatePaymentMethodRequest"
						}
					}
				}
			},
			responses: {
				201: {
					description: "Metode dibuat",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/PaymentMethod"
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
	"/api/payment-methods/{id}": {
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
			tags: ["PaymentMethods"],
			summary: "Detail metode pembayaran",
			operationId: "getPaymentMethod",
			responses: {
				200: {
					description: "Detail metode",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/PaymentMethod"
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
			tags: ["PaymentMethods"],
			summary: "Perbarui metode pembayaran",
			operationId: "updatePaymentMethod",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/UpdatePaymentMethodRequest"
						}
					}
				}
			},
			responses: {
				200: {
					description: "Metode diperbarui",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/PaymentMethod"
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
			tags: ["PaymentMethods"],
			summary: "Hapus metode pembayaran",
			operationId: "deletePaymentMethod",
			responses: {
				204: {
					description: "Metode dihapus"
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

export default paymentMethodsPaths;
