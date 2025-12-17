const systemLogsPaths = {
	"/api/system-logs": {
		get: {
			tags: ["SystemLogs"],
			summary: "Daftar system logs",
			operationId: "listSystemLogs",
			responses: {
				200: {
					description: "Daftar logs",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/SystemLog"
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
			tags: ["SystemLogs"],
			summary: "Catat system log",
			operationId: "createSystemLog",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateSystemLogRequest"
						}
					}
				}
			},
			responses: {
				201: {
					description: "Log dibuat",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/SystemLog"
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
	"/api/system-logs/{id}": {
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
			tags: ["SystemLogs"],
			summary: "Detail system log",
			operationId: "getSystemLog",
			responses: {
				200: {
					description: "Detail log",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/SystemLog"
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
			tags: ["SystemLogs"],
			summary: "Hapus system log",
			operationId: "deleteSystemLog",
			responses: {
				204: {
					description: "Log dihapus"
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

export default systemLogsPaths;
