const express = require("express");
const app = express();
const cors = require("cors");
const productsRoute = require("../router/products.route");
const path = require("path");
const viewsRoute = require("../router/viewsRoute.route");
const methodOverride = require("method-override");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../public/views"));
app.use(express.static("public"));

app.use("/", viewsRoute);
app.use("/products", productsRoute);

app.use((req, res, next) => {
  res.status(404).render("notFound");
  next();
});

module.exports = app;
