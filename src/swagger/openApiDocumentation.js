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
  paths: {},

  components: {
    schemas: {
      Response: {
        type: "object",
        properties: {
          status: {
            type: "string",
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
