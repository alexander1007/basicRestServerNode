const { Category, Product, Role, User } = require("../models");

const isValidRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`Role: ${role} doesn´t exist`);
  }
};

const isEmailValid = async (email = "") => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`Email ${email} already exists`);
  }
};

const existUserById = async (id = "") => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`User ${id} doesn´t exist`);
  }
};

const existCategory = async (id = "") => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error(`Category doesn´t exist`);
  }
};

const existProduct = async (id = "") => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error(`Category doesn´t exist`);
  }
};

module.exports = {
  isValidRole,
  isEmailValid,
  existUserById,
  existCategory,
  existProduct,
};
