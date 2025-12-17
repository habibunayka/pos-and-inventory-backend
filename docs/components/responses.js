const responses = {
	BadRequest: {
		description: "Permintaan tidak valid",
		content: {
			"application/json": {
				schema: {
					$ref: "#/components/schemas/ErrorResponse"
				}
			}
		}
	},
	Unauthorized: {
		description: "Autentikasi gagal",
		content: {
			"application/json": {
				schema: {
					$ref: "#/components/schemas/ErrorResponse"
				}
			}
		}
	},
	Forbidden: {
		description: "Akses ditolak",
		content: {
			"application/json": {
				schema: {
					$ref: "#/components/schemas/ErrorResponse"
				}
			}
		}
	},
	NotFound: {
		description: "Sumber daya tidak ditemukan",
		content: {
			"application/json": {
				schema: {
					$ref: "#/components/schemas/ErrorResponse"
				}
			}
		}
	},
	InternalServerError: {
		description: "Terjadi kesalahan pada server",
		content: {
			"application/json": {
				schema: {
					$ref: "#/components/schemas/ErrorResponse"
				}
			}
		}
	}
};

export default responses;
