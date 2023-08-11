const express = require("express");
const bodyParser = require("body-parser");

const { createHandler } = require("graphql-http/lib/use/express");
const expressPlayground =
  require("graphql-playground-middleware-express").default;
const mongoose = require("mongoose");
const app = express();
const schema = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/isAuth");

app.use(bodyParser.json());

console.log("=====", isAuth);

app.use(isAuth);
app.all(
  "/graphql",
  createHandler({
    schema,
    rootValue: resolvers,
  })
);

app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.eqhsz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("now listening for requests on port 4000");
    });
  })
  .catch((err) => console.log(err));
