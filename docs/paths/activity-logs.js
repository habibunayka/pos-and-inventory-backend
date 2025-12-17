const activityLogsPaths = {
	"/api/activity-logs": {
		get: {
			tags: ["ActivityLogs"],
			summary: "Daftar activity logs",
			operationId: "listActivityLogs",
			responses: {
				200: {
					description: "Daftar logs",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/ActivityLog"
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
			tags: ["ActivityLogs"],
			summary: "Catat activity log",
			operationId: "createActivityLog",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateActivityLogRequest"
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
								$ref: "#/components/schemas/ActivityLog"
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
	"/api/activity-logs/{id}": {
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
			tags: ["ActivityLogs"],
			summary: "Detail activity log",
			operationId: "getActivityLog",
			responses: {
				200: {
					description: "Detail log",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ActivityLog"
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
			tags: ["ActivityLogs"],
			summary: "Hapus activity log",
			operationId: "deleteActivityLog",
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

export default activityLogsPaths;
