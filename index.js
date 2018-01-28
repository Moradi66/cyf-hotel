const SERVER_PORT = process.env.PORT || 8080;

const express = require("express");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");

const apiRouter = require("./api");

const app = express();
const router = express.Router();

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: "hbs"
  })
);
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.static("assets"));

app.use("/api", apiRouter);

// handle HTTP POST requests
app.use(bodyparser.json());

app.get("/", function(req, res, next) {
  res.render("home");
});

//Render invoice page
// app.get("/invoices", function(req, res, next) {
// 	res.render("invoices");
// })

app.listen(SERVER_PORT, () => {
  console.info(`Server started at http://localhost:${SERVER_PORT}`);
});
