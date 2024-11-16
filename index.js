const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const { ApolloServer } = require("@apollo/server");
const { json } = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const typeDefs = require("./schemas/schema");
const resolvers = require("./resolvers/employeeResolver");
const { authenticate } = require("./utils/auth");
require("dotenv").config();

const startServer = async () => {
  const app = express();

  // Connect to the database
  await connectDB();

  // Create an Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Middleware for Express
  app.use(
    "/graphql",
    cors(), // Enable CORS
    json(), // Parse JSON bodies
    expressMiddleware(server, {
      context: async ({ req }) => {
        authenticate(req); // Handle authentication
        return { user: req.user };
      },
    })
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
};

startServer();
