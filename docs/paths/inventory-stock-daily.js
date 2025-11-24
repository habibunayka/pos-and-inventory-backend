const inventoryStockDailyPaths = {
  "/api/inventory-stock-daily": {
    "get": {
      "tags": [
        "InventoryStockDaily"
      ],
      "summary": "Daftar stok harian",
      "operationId": "listInventoryStockDaily",
      "responses": {
        "200": {
          "description": "Daftar stok harian",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/InventoryStockDaily"
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
        "InventoryStockDaily"
      ],
      "summary": "Buat stok harian",
      "operationId": "createInventoryStockDaily",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateInventoryStockDailyRequest"
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "Stok harian dibuat",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InventoryStockDaily"
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
  "/api/inventory-stock-daily/{id}": {
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
        "InventoryStockDaily"
      ],
      "summary": "Detail stok harian",
      "operationId": "getInventoryStockDaily",
      "responses": {
        "200": {
          "description": "Detail stok harian",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InventoryStockDaily"
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
        "InventoryStockDaily"
      ],
      "summary": "Perbarui stok harian",
      "operationId": "updateInventoryStockDaily",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateInventoryStockDailyRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Stok harian diperbarui",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InventoryStockDaily"
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
        "InventoryStockDaily"
      ],
      "summary": "Hapus stok harian",
      "operationId": "deleteInventoryStockDaily",
      "responses": {
        "204": {
          "description": "Stok harian dihapus"
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

export default inventoryStockDailyPaths;
