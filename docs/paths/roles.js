const rolesPaths = {
  "/api/roles": {
    "get": {
      "tags": [
        "Roles"
      ],
      "summary": "Daftar semua role",
      "operationId": "listRoles",
      "responses": {
        "200": {
          "description": "Daftar role berhasil diambil",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Role"
                }
              }
            }
          }
        },
        "500": {
          "$ref": "#/components/responses/InternalServerError"
        }
      }
    },
    "post": {
      "tags": [
        "Roles"
      ],
      "summary": "Buat role baru",
      "operationId": "createRole",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateRoleRequest"
            }
          }
        },
        "description": "Buat role baru dengan daftar permission. Nama permission harus sudah terdaftar."
      },
      "responses": {
        "201": {
          "description": "Role berhasil dibuat",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Role"
              }
            }
          }
        },
        "400": {
          "$ref": "#/components/responses/BadRequest"
        },
        "500": {
          "$ref": "#/components/responses/InternalServerError"
        }
      }
    }
  },
  "/api/roles/{id}": {
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "ID role",
        "schema": {
          "type": "integer",
          "minimum": 1
        }
      }
    ],
    "get": {
      "tags": [
        "Roles"
      ],
      "summary": "Ambil detail role",
      "operationId": "getRole",
      "responses": {
        "200": {
          "description": "Detail role ditemukan",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Role"
              }
            }
          }
        },
        "400": {
          "$ref": "#/components/responses/BadRequest"
        },
        "404": {
          "$ref": "#/components/responses/NotFound"
        },
        "500": {
          "$ref": "#/components/responses/InternalServerError"
        }
      }
    },
    "put": {
      "tags": [
        "Roles"
      ],
      "summary": "Perbarui role",
      "operationId": "updateRole",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UpdateRoleRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Role berhasil diperbarui",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Role"
              }
            }
          }
        },
        "400": {
          "$ref": "#/components/responses/BadRequest"
        },
        "404": {
          "$ref": "#/components/responses/NotFound"
        },
        "500": {
          "$ref": "#/components/responses/InternalServerError"
        }
      }
    },
    "delete": {
      "tags": [
        "Roles"
      ],
      "summary": "Hapus role",
      "operationId": "deleteRole",
      "responses": {
        "204": {
          "description": "Role berhasil dihapus"
        },
        "400": {
          "$ref": "#/components/responses/BadRequest"
        },
        "404": {
          "$ref": "#/components/responses/NotFound"
        },
        "500": {
          "$ref": "#/components/responses/InternalServerError"
        }
      }
    }
  }
};

export default rolesPaths;
