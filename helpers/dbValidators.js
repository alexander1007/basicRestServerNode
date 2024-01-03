const Role = require("../models/role.model");
const User = require("../models/user.model");

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

module.exports = { isValidRole, isEmailValid, existUserById };
