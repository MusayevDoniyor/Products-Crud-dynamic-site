const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data", "products.json");
const { v4: uuid4 } = require("uuid");

const readProducts = () => {
  const products = fs.readFileSync(productsFilePath, "utf8");
  return JSON.parse(products);
};

const writeProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

const addProduct = (product) => {
  const products = readProducts();
  product.id = uuid4();
  products.push(product);
  writeProducts(products);
  return product;
};

const returnProductById = (id) => {
  const products = readProducts();
  return products.find((p) => p.id === id);
};

const updateProduct = (id, updateProduct) => {
  const products = readProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) return null;

  if (updateProduct.name) products[index].name = updateProduct.name;
  if (updateProduct.price) products[index].price = updateProduct.price;

  writeProducts(products);
  return products[index];
};

const removeProduct = (id) => {
  let products = readProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) return null;

  products = products.filter((p) => p.id !== id);
  writeProducts(products);
  return products[index];
};

module.exports = {
  readProducts,
  addProduct,
  returnProductById,
  updateProduct,
  removeProduct,
};
