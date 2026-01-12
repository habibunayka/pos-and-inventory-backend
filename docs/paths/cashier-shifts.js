const cashierShiftsPaths = {
	"/api/cashier-shifts": {
		get: {
			tags: ["CashierShifts"],
			summary: "Daftar shift kasir",
			operationId: "listCashierShifts",
			responses: {
				200: {
					description: "Daftar shift kasir",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/CashierShift"
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
			tags: ["CashierShifts"],
			summary: "Buka shift kasir (raw)",
			operationId: "createCashierShift",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateCashierShiftRequest"
						}
					}
				}
			},
			responses: {
				201: {
					description: "Shift dibuat",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/CashierShift"
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
	"/api/cashier-shifts/open": {
		post: {
			tags: ["CashierShifts"],
			summary: "Buka shift kasir",
			operationId: "openCashierShift",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/OpenCashierShiftRequest"
						}
					}
				}
			},
			responses: {
				201: {
					description: "Shift dibuka",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/CashierShift"
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
	"/api/cashier-shifts/{id}": {
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
			tags: ["CashierShifts"],
			summary: "Detail shift kasir",
			operationId: "getCashierShift",
			responses: {
				200: {
					description: "Detail shift",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/CashierShift"
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
		post: {
			tags: ["CashierShifts"],
			summary: "Tutup shift kasir",
			operationId: "closeCashierShift",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CloseCashierShiftRequest"
						}
					}
				}
			},
			responses: {
				200: {
					description: "Shift ditutup",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/CashierShift"
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
			tags: ["CashierShifts"],
			summary: "Update shift kasir",
			operationId: "updateCashierShift",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/UpdateCashierShiftRequest"
						}
					}
				}
			},
			responses: {
				200: {
					description: "Shift diperbarui",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/CashierShift"
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
			tags: ["CashierShifts"],
			summary: "Hapus shift kasir",
			operationId: "deleteCashierShift",
			responses: {
				204: {
					description: "Shift dihapus"
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

export default cashierShiftsPaths;
