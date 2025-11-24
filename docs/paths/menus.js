const menusPaths = {
  "/api/menus": {
    "get": {
      "tags": [
        "Menus"
      ],
      "summary": "Daftar menu",
      "operationId": "listMenus",
      "responses": {
        "200": {
          "description": "Daftar menu",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Menu"
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
        "Menus"
      ],
      "summary": "Buat menu",
      "operationId": "createMenu",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateMenuRequest"
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "Menu dibuat",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Menu"
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
  "/api/menus/{id}": {
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
        "Menus"
      ],
      "summary": "Detail menu",
      "operationId": "getMenu",
      "responses": {
        "200": {
          "description": "Detail menu",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Menu"
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
        "Menus"
      ],
      "summary": "Perbarui menu",
      "operationId": "updateMenu",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UpdateMenuRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Menu diperbarui",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Menu"
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
        "Menus"
      ],
      "summary": "Hapus menu",
      "operationId": "deleteMenu",
      "responses": {
        "204": {
          "description": "Menu dihapus"
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

export default menusPaths;
