const {
  readProducts,
  returnProductById,
  addProduct,
  updateProduct,
  removeProduct,
} = require("../services/products.service");

const getProducts = (req, res) => {
  try {
    const products = readProducts();

    if (products.length < 1)
      return res.status(400).json({ message: "Products not found" });

    res.status(200).json({ count: products.length, products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProductById = (req, res) => {
  try {
    const products = readProducts();

    if (products.length < 1)
      return res.status(400).json({ message: "Products not found" });

    const product = returnProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const postProduct = (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newProduct = addProduct({ name, price });

    res.redirect("/");
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const putProduct = (req, res) => {
  try {
    const updatedProduct = updateProduct(req.params.id, req.body);

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.redirect("/");
    res.status(201).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteProduct = (req, res) => {
  try {
    const deleteProduct = removeProduct(req.params.id);
    if (!deleteProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(201).json({
      message: "Product deleted successfully",
      product: deleteProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};
