const recipesPaths = {
  "/api/recipes": {
    "get": {
      "tags": [
        "Recipes"
      ],
      "summary": "Daftar resep",
      "operationId": "listRecipes",
      "responses": {
        "200": {
          "description": "Daftar resep",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Recipe"
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
        "Recipes"
      ],
      "summary": "Buat resep",
      "operationId": "createRecipe",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateRecipeRequest"
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "Resep dibuat",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Recipe"
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
  "/api/recipes/{id}": {
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
        "Recipes"
      ],
      "summary": "Detail resep",
      "operationId": "getRecipe",
      "responses": {
        "200": {
          "description": "Detail resep",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Recipe"
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
        "Recipes"
      ],
      "summary": "Perbarui resep",
      "operationId": "updateRecipe",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UpdateRecipeRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Resep diperbarui",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Recipe"
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
        "Recipes"
      ],
      "summary": "Hapus resep",
      "operationId": "deleteRecipe",
      "responses": {
        "204": {
          "description": "Resep dihapus"
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

export default recipesPaths;
