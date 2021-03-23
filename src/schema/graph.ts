import { GraphQLSchema } from "graphql";

import { RootQuery } from "./RootQueryType";
import { Mutations } from "./Mutations";

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
