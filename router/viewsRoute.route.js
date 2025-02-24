const router = require("express").Router();
const {
  renderHomePage,
  renderAddProductPage,
  renderEditProductPage,
  renderSingleProductPage,
} = require("../controllers/views.controller");

router.get("/", renderHomePage);
router.get("/add", renderAddProductPage);
router.get("/edit/:id", renderEditProductPage);
router.get("/products/:id", renderSingleProductPage);

module.exports = router;
