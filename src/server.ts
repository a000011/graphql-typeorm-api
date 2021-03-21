import * as express from "express";
import {graphqlHTTP} from "express-graphql";
const schema = require("./schema/Graph");
import { createConnection } from "typeorm";
import {User} from "./entity/User";
import * as bodyParser from "body-parser";

const app = express();
const PORT = 8000;

(async () => {
    await createConnection();
    //console.log(await User.find({relations: ['group', 'rank']}))
} 
)();


app.use( bodyParser({limit: '10MB'}) ); 
app.use("/graph", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log("[server]: Server is working");
});
