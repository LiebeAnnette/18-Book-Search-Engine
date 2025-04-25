import express from "express";
import path from "node:path";
import db from "./config/connection.js";
import routes from "./routes/index.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./schemas";
import { getUserFromToken } from "./services/auth";

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // lets you use GraphQL playground in dev
});
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(routes);

// db.once("open", () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

async function startApolloServer() {
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        const user = await getUserFromToken(token); // (we’ll create this next)
        return { user };
      },
    })
  );

  app.use(routes);

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Server running on http://localhost:${PORT}`);
      console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
