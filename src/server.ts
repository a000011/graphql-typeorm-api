import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import GroupResolver from "./resolvers/GroupResolver";
import RankResolver from "./resolvers/RankResolver";
import UserResolver from "./resolvers/UserResolver";
const PORT = 8000;

(async () => {
  const app = express();
  const schema = await buildSchema({
    resolvers: [GroupResolver, RankResolver, UserResolver],
  });

  await createConnection();

  const apolloServer = new ApolloServer({ schema });
  apolloServer.applyMiddleware({ app });

  const server = createServer(app);
  server.listen(PORT, () => {
    // eslint-disable-next-line no-new
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
      },
      {
        server,
      }
    );

    console.log(`
		express server STARTED
		on port ${PORT}
		url = http://localhost:${PORT}/graphql`);
  });
})();
