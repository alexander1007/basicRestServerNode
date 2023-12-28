const { response, request } = require("express");

const usersGet = (req = request, res = response) => {
  const {
    query: { name, type },
  } = req;
  res.json({
    message: "get in controllers",
    name,
    type,
  });
};
const usersPost = (req, res = response) => {
  const {
    body: { name, type },
  } = req;
  console.log("body", name, type);
  res.json({
    message: "post in controllers",
    name,
    type,
  });
};
const usersPatch = (req, res = response) => {
  res.json({
    message: "patch in controllers",
  });
};
const usersPut = (req, res = response) => {
  const {
    params: { id },
  } = req;

  res.json({
    message: "put in controllers",
  });
};
const usersDelete = (req, res = response) => {
  res.json({
    message: "delete in controllers",
  });
};

module.exports = { usersGet, usersPost, usersPatch, usersPut, usersDelete };
