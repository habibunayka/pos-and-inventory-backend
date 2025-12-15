const authPaths = {
  "/api/auth/login": {
    "post": {
      "tags": [
        "Auth"
      ],
      "summary": "Login pengguna",
      "operationId": "loginUser",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "description": "Gunakan skema password untuk admin/owner atau PIN untuk kasir",
              "oneOf": [
                {
                  "$ref": "#/components/schemas/LoginRequest"
                },
                {
                  "$ref": "#/components/schemas/LoginWithPinRequest"
                }
              ]
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Login berhasil",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginResponse"
              }
            }
          }
        },
        "400": {
          "$ref": "#/components/responses/BadRequest"
        },
        "401": {
          "$ref": "#/components/responses/Unauthorized"
        },
        "403": {
          "$ref": "#/components/responses/Forbidden"
        },
        "500": {
          "$ref": "#/components/responses/InternalServerError"
        }
      },
      "security": []
    }
  },
  "/api/auth/logout": {
    "post": {
      "tags": [
        "Auth"
      ],
      "summary": "Logout pengguna",
      "operationId": "logoutUser",
      "responses": {
        "204": {
          "description": "Logout berhasil"
        },
        "401": {
          "$ref": "#/components/responses/Unauthorized"
        },
        "500": {
          "$ref": "#/components/responses/InternalServerError"
        }
      }
    }
  }
};

export default authPaths;
