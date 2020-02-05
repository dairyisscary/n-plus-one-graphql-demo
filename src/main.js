const express = require("express");
const graphqlHTTP = require("express-graphql");
const morgan = require("morgan");
const schema = require("./schema");
const { buildLoaderGetter } = require("./services/loaders");

const app = express();

app.use(morgan("dev"));

app.use(
  "/graphql",
  graphqlHTTP(request => ({
    schema,
    graphiql: true,
    context: { request, getLoader: buildLoaderGetter() },
  })),
);

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
