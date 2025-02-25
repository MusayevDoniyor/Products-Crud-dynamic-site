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

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }

    res.status(200).json({ count: products.length, products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProductById = (req, res) => {
  try {
    const product = returnProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const postProduct = (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined || typeof price !== "number") {
      return res
        .status(400)
        .json({ message: "All fields required and price must be a number" });
    }

    const newProduct = addProduct({ name, price });

    // Agar site da postdan keyin home ga o'tqizmoqchi bo'sez commentda oching ikkalasini bittada ishlatomadim
    // res.redirect("/");
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

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Agar site da putdan keyin home ga o'tqizmoqchi bo'sez commentda oching ikkalasini bittada ishlatomadim
    // res.redirect("/");
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteProduct = (req, res) => {
  try {
    const deletedProduct = removeProduct(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
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
