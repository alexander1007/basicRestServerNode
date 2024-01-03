const { response, request } = require("express");
const { cryptPassword } = require("../helpers/crypt");

const User = require("../models/user.model");

const usersGet = async (req = request, res = response) => {
  const {
    query: { limit = 5, from = 1 },
  } = req;

  const condition = { status: true };
  const [total, users] = await Promise.all([
    User.countDocuments(condition),
    User.find(condition).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};
const usersPost = async (req, res = response) => {
  const {
    body: { name, email, password, role },
  } = req;

  const user = new User({ name, email, password, role });

  user.password = cryptPassword(password);
  await user.save();

  res.json({ user });
};
const usersPatch = (req, res = response) => {
  res.json({
    message: "patch in controllers",
  });
};
const usersPut = async (req, res = response) => {
  const {
    params: { id },
    body: { password, google, email, ...properties },
  } = req;

  if (password) properties.password = cryptPassword(password);

  const user = await User.findByIdAndUpdate(id, properties);

  res.json({ user });
};
const usersDelete = async (req, res = response) => {
  const {
    params: { id },
  } = req;

  const user = await User.findByIdAndUpdate(id, { status: false });
  res.json({ user });
};

module.exports = { usersGet, usersPost, usersPatch, usersPut, usersDelete };
