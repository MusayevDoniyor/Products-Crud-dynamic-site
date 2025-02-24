const { returnProductById } = require("../services/products.service");

const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:7777/products");
    const products = await response.json();
    return products.products;
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
};

const getProductById = async (id) => {
  try {
    return returnProductById(id);
  } catch (error) {
    console.error("Error fetching product", error);
    return null;
  }
};

const renderHomePage = async (req, res) => {
  try {
    const products = await getProducts();
    res.render("index", { products });
  } catch (error) {
    res.status(500).send("Error loading products");
  }
};

const renderAddProductPage = (req, res) => {
  res.render("add");
};

const renderEditProductPage = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("edit", { product });
  } catch (error) {
    res.status(500).send("Error loading product for edit");
  }
};

const renderSingleProductPage = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("single", { product });
  } catch (error) {
    res.status(500).send("Error loading product");
  }
};

module.exports = {
  renderHomePage,
  renderAddProductPage,
  renderEditProductPage,
  renderSingleProductPage,
};
