const transactionsPaths = {
  "/api/transactions": {
    "get": {
      "tags": [
        "Transactions"
      ],
      "summary": "Daftar transaksi",
      "operationId": "listTransactions",
      "responses": {
        "200": {
          "description": "Daftar transaksi",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Transaction"
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
        "Transactions"
      ],
      "summary": "Buat transaksi",
      "operationId": "createTransaction",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateTransactionRequest"
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "Transaksi dibuat",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Transaction"
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
  "/api/transactions/{id}": {
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "integer",
          "minimum": 1
        }
      }
    ],
    "get": {
      "tags": [
        "Transactions"
      ],
      "summary": "Detail transaksi",
      "operationId": "getTransaction",
      "responses": {
        "200": {
          "description": "Detail transaksi",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Transaction"
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
        "Transactions"
      ],
      "summary": "Perbarui transaksi",
      "operationId": "updateTransaction",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UpdateTransactionRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Transaksi diperbarui",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Transaction"
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
        "Transactions"
      ],
      "summary": "Hapus transaksi",
      "operationId": "deleteTransaction",
      "responses": {
        "204": {
          "description": "Transaksi dihapus"
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

export default transactionsPaths;
