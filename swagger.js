const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Dockerized Store Management Micro-Service",
      description: "A Dockerized Microservice for Store Management",
      contact: {
        name: "Store APIs",
      },
      server: ["http:localhost:5000"],
    },
  },
  apis: ["./src/routes/*.js"],
};

export default swaggerOptions;
