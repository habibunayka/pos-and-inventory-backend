const reportFilesPaths = {
  "/api/report-files": {
    "get": {
      "tags": [
        "ReportFiles"
      ],
      "summary": "Daftar report files",
      "operationId": "listReportFiles",
      "responses": {
        "200": {
          "description": "Daftar report files",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/ReportFile"
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
        "ReportFiles"
      ],
      "summary": "Buat record report file",
      "operationId": "createReportFile",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateReportFileRequest"
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "Record dibuat",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ReportFile"
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
  "/api/report-files/{id}": {
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
        "ReportFiles"
      ],
      "summary": "Detail report file",
      "operationId": "getReportFile",
      "responses": {
        "200": {
          "description": "Detail report file",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ReportFile"
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
        "ReportFiles"
      ],
      "summary": "Perbarui report file",
      "operationId": "updateReportFile",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UpdateReportFileRequest"
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Record diperbarui",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ReportFile"
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
        "ReportFiles"
      ],
      "summary": "Hapus report file",
      "operationId": "deleteReportFile",
      "responses": {
        "204": {
          "description": "Record dihapus"
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

export default reportFilesPaths;
