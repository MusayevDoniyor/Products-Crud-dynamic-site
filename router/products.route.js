const router = require("express").Router();
const {
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controllers/products.controller");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", postProduct);
router.put("/edit/:id", putProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
