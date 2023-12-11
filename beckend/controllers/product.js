const Product = require("../models/Product");

async function addProduct(dataProduct) {
  const product = await Product.create(dataProduct);
  return product;
}

async function getCategories() {
  const products = await Product.find();
  const categories = products.map((item) => item.category);
  const result = categories.reduce((acc, item) => {
    if (acc.includes(item)) {
      return acc;
    }
    return [...acc, item];
  }, []);
  return result;
}

async function getProducts(data, limit = 10) {
  let sortPrise = { createdAt: 1 };
  if (data.decrease) {
    sortPrise = { prise: -1 };
  }
  if (data.increase) {
    sortPrise = { prise: 1 };
  }

  const [products, count] = await Promise.all([
    Product.find({ title: { $regex: data.searchPhrase, $options: "i" } })
      .find({ category: { $regex: data.category, $options: "i" } })
      .limit(limit)
      .skip((data.page - 1) * limit)
      .sort(sortPrise),
    Product.countDocuments({
      title: { $regex: data.searchPhrase, $options: "i" },
    }).countDocuments({ category: { $regex: data.category, $options: "i" } }),
  ]);

  return { products, count };
}

async function getProduct(id) {
  const product = await Product.findOne({ _id: id });
  return product;
}

function updateProduct(id, productData) {
  return Product.findByIdAndUpdate(id, productData, {
    returnDocument: "after",
  });
}

function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

module.exports = {
  addProduct,
  getCategories,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
