import express from "express";
import path from "node:path";
import db from "./config/connection.js";
// import routes from "./routes/index.js";

// TODO:  Implement the Apollo Server and apply it to the Express server as middleware.
// Import the ApolloServer class
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { authenticateToken } from "./services/auth.js";

// Import the two parts of a GraphQL schema
import { typeDefs, resolvers } from "././schemas/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const startApolloServer = async () => {
  await server.start();
  await db();

  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, { context: authenticateToken })
  );

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === "production") {
    const clientPath = path.resolve(__dirname, "../../client/dist");

    app.use(express.static(clientPath));

    app.get("*", (_req, res) => {
      res.sendFile(path.join(clientPath, "index.html"));
    });
  }

  // app.use(routes); [from starter code]

  // db.on("error", console.error.bind(console, "MongoDB connection error:"));

  app.listen(PORT, () => {
    console.log(`🌍 Now listening at http://localhost:${PORT}`);
    console.log(`🚀 GraphQL endpoint at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
