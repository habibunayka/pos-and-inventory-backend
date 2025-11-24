const packagesPaths = {
  "/api/packages": {
    "get": {
      "tags": [
        "Packages"
      ],
      "summary": "Daftar semua paket/kemasan",
      "operationId": "listPackages",
      "responses": {
        "200": {
          "description": "Daftar paket berhasil diambil",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Package"
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
        "Packages"
      ],
      "summary": "Buat paket/kemasan baru",
      "operationId": "createPackage",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreatePackageRequest"
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "Paket berhasil dibuat",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Package"
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
  "/api/packages/{id}": {
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "ID paket",
        "schema": {
          "type": "integer",
          "minimum": 1
        }
      }
    ],
    "get": {
      "tags": [
        "Packages"
      ],
      "summary": "Ambil detail paket",
      "operationId": "getPackage",
      "responses": {
        "200": {
          "description": "Detail paket",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Package"
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
        "Packages"
      ],
      "summary": "Perbarui paket",
      "operationId": "updatePackage",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UpdatePackageRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Paket diperbarui",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Package"
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
        "Packages"
      ],
      "summary": "Hapus paket",
      "operationId": "deletePackage",
      "responses": {
        "204": {
          "description": "Paket dihapus"
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

export default packagesPaths;
