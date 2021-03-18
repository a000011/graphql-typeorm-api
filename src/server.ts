const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./schema/Graph");
import { createConnection } from "typeorm";
import {User} from "./entity/User";

const app = express();
const PORT = 8000;

(async () => {
    await createConnection();
    //console.log(await User.find({relations: ['group', 'rank']}))
} 
)();
app.use("/graph", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log("[server]: Server is working");
});
