const { response, request } = require("express");
const { Category } = require("../models");

const getCategories = async (req = request, res = response) => {
  const {
    query: { limit = 5, from = 0 },
  } = req;

  const condition = { status: true };
  const [total, categories] = await Promise.all([
    Category.countDocuments(condition),
    Category.find(condition)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("user", "name"),
  ]);

  res.json({
    total,
    categories,
  });
};

const getCategoryById = async (req = request, res = response) => {
  const {
    params: { id },
  } = req;

  const category = await validateCategory(id);

  if (!category) {
    return res.status(401).json({ msg: `Category doesn´t exist` });
  }

  res.status(201).json({ category });
};

const createCategory = async (req = request, res = response) => {
  const {
    body: { name },
    authUser: { _id },
  } = req;
  const categoryName = name.toUpperCase();

  try {
    const existCategory = await Category.findOne({ name: categoryName });

    if (existCategory) {
      return res.status(400).json({ msg: `Category: ${name} already exist` });
    }
    const data = {
      name: categoryName,
      user: _id,
    };

    const category = new Category(data);
    await category.save();
    res.status(201).json({ msg: `Category: ${name} created`, category });
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = async (req = request, res = response) => {
  const {
    body: { status, user, ...data },
    params: { id },
    authUser: { _id },
  } = req;

  let category = await validateCategory(id);

  if (!category) {
    return res.status(400).json({ msg: `Category doesn´t exist` });
  }

  const newName = data.name.toUpperCase();
  data.name = newName;
  data.user = _id;
  category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json({ category });
};

const deleteCategory = async (req = request, res = response) => {
  const {
    params: { id },
    authUser: { _id },
  } = req;

  let category = await validateCategory(id);

  if (!category || !category?.status) {
    return res.status(400).json({ msg: `Category doesn´t exist` });
  }

  const data = {
    status: false,
    user: _id,
  };

  category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json({ category });
};

const validateCategory = (id) => {
  return Category.findById(id).populate("user", "name");
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  validateCategory,
};
