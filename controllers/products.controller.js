const { response, request } = require("express");
const { Product } = require("../models");
const { validateCategory } = require("./categories.controller");

const getProducts = async (req = request, res = response) => {
  const {
    query: { limit = 5, from = 0 },
  } = req;

  const condition = { status: true };
  const [total, products] = await Promise.all([
    Product.countDocuments(condition),
    Product.find(condition)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("user", "name")
      .populate("category", "name"),
  ]);

  res.json({
    total,
    products,
  });
};

const getProductById = async (req = request, res = response) => {
  const {
    params: { id },
  } = req;

  const product = await validateProduct(id);

  if (!product) {
    return res.status(401).json({ msg: `Product doesn´t exist` });
  }

  res.status(201).json({ product });
};

const createProduct = async (req = request, res = response) => {
  const {
    body: { status, user, name, ...body },
    authUser: { _id },
  } = req;

  const productName = name.toUpperCase();

  try {
    let product = await Product.findOne({ name: productName });

    if (product) {
      return res.status(400).json({ msg: `Product: ${name} already exist` });
    }

    const data = {
      name: productName,
      user: _id,
      ...body,
    };

    product = new Product(data);

    await product.save();
    res.status(201).json({ msg: `Product: ${name} created`, product });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req = request, res = response) => {
  const {
    body: { status, user, category, ...data },
    params: { id },
    authUser: { _id },
  } = req;

  let product = await validateProduct(id);

  if (!product) {
    return res.status(400).json({ msg: `Product doesn´t exist` });
  }
  if (product?.category !== category) {
    const categoryToUpdate = await validateCategory(category);
    if (categoryToUpdate) {
      data.category = category;
    }
  }
  const newName = data?.name.toUpperCase();
  data.name = newName;
  data.user = _id;
  product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json({ product });
};

const deleteProduct = async (req = request, res = response) => {
  const {
    params: { id },
    authUser: { _id },
  } = req;

  let product = await validateProduct(id);

  if (!product || !product?.status) {
    return res.status(400).json({ msg: `Product doesn´t exist` });
  }

  const data = {
    status: false,
    user: _id,
  };

  product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json({ product });
};

const validateProduct = (id) => {
  return Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
