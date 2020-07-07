const openApiDocumentation = {
  swagger: "3.0",
  openapi: "3.0.1",
  info: {
    title: " Dockerized Store Management Micro-Service",
    description: "A Dockerized Microservice for Store Management",
    contact: {
      name: "Store APIs",
    },
  },
  server: [
    {
      url: "http:localhost:3000",
      description: "Local Server",
    },
  ],
  tags: [
    {
      name: "API Auth",
    },
    {
      name: "CRUD Operations",
    },
  ],
  security: {
    bearerAuth: {},
  },
  paths: {
    "/v1/register": {
      post: {
        tags: ["API Auth"],
        description: "Add Service User",
        operationId: "addServiceUser",
        security: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
    },
    "/v1/signin": {
      post: {
        tags: ["API Auth"],
        description: "Singin Service User",
        operationId: "signServiceUser",
        security: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
    },
    "/v1/me": {
      get: {
        tags: ["CRUD Operations"],
        description: "Get Service User",
        operationId: "getServiceUser",
        security: [
          {
            bearerAuth: {},
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["CRUD Operations"],
        description: "Update Service User",
        operationId: "updateServiceUser",
        security: [
          {
            bearerAuth: {},
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
    },
    "/v1/token": {
      get: {
        tags: ["CRUD Operations"],
        description: "Get apiKey",
        operationId: "getApiKey",
        security: [
          {
            bearerAuth: {},
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["CRUD Operations"],
        description: "New apiKey",
        operationId: "newApiKey",
        security: [
          {
            bearerAuth: {},
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
    },
    "/v1/stores": {
      get: {
        tags: ["CRUD Operations"],
        description: "Get stores",
        operationId: "getStores",
        security: [
          {
            bearerAuth: {},
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["CRUD Operations"],
        description: "Create store",
        operationId: "createStore",
        security: [
          {
            bearerAuth: {},
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Store",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
    },

    "/v1/stores/{store}": {
      delete: {
        tags: ["CRUD Operations"],
        description: "Delete Store",
        operationId: "deleteStore",
        security: [
          {
            bearerAuth: {},
          },
        ],
        parameters: [
          {
            name: "store",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["CRUD Operations"],
        description: "Get a Store",
        operationId: "getStore",
        security: [
          {
            bearerAuth: {},
          },
        ],
        parameters: [
          {
            name: "store",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["CRUD Operations"],
        description: "Update a Store",
        operationId: "updateStore",
        security: [
          {
            bearerAuth: {},
          },
        ],
        parameters: [
          {
            name: "store",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
          {
            name: "body",
            in: "body",
            schema: {
              $ref: "#/components/schemas/Store",
            },
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
    },
  },

  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
          username: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      Store: {
        type: "object",
        properties: {
          storeName: {
            type: "string",
          },
          email: {
            type: "string",
          },
          storeLocation: {
            type: "string",
          },
          phone: {
            type: "string",
          },
          storeTagLine: {
            type: "string",
          },
        },
      },
      Response: {
        type: "object",
        properties: {
          status: {
            type: "boolean",
          },
          message: {
            type: "string",
          },
          data: {
            type: "object",
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        in: "header",
      },
    },
  },
};

module.exports = openApiDocumentation;
