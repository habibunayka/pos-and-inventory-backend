const menuVariantItemsPaths = {
  "/api/menu-variant-items": {
    "get": {
      "tags": [
        "MenuVariantItems"
      ],
      "summary": "Daftar item varian",
      "operationId": "listMenuVariantItems",
      "responses": {
        "200": {
          "description": "Daftar item varian",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/MenuVariantItem"
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
        "MenuVariantItems"
      ],
      "summary": "Buat item varian",
      "operationId": "createMenuVariantItem",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateMenuVariantItemRequest"
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "Item varian dibuat",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MenuVariantItem"
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
  "/api/menu-variant-items/{id}": {
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
        "MenuVariantItems"
      ],
      "summary": "Detail item varian",
      "operationId": "getMenuVariantItem",
      "responses": {
        "200": {
          "description": "Detail item",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MenuVariantItem"
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
        "MenuVariantItems"
      ],
      "summary": "Perbarui item varian",
      "operationId": "updateMenuVariantItem",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UpdateMenuVariantItemRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Item varian diperbarui",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MenuVariantItem"
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
        "MenuVariantItems"
      ],
      "summary": "Hapus item varian",
      "operationId": "deleteMenuVariantItem",
      "responses": {
        "204": {
          "description": "Item varian dihapus"
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

export default menuVariantItemsPaths;
