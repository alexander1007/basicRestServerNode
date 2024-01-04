const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const {
  env: { SECRET_KEY: key },
} = process;

const isAdminRole = async (req = request, res = response, next) => {
  const { authUser } = req;

  if (!authUser) {
    res.status(500).json({ msg: "Attempt to verify role without exist token" });
  }

  const { role, name } = authUser;
  if (role !== "ADMIN") {
    res.status(401).json({ msg: `${name} it´s not an admin` });
  }

  next();
};

const hasPermittedRole = (...roles) => {
  return (req = request, res = response, next) => {
    const { authUser } = req;

    if (!authUser) {
      res
        .status(500)
        .json({ msg: "Attempt to verify role without exist token" });
    }

    const { role, name } = authUser;
    if (!roles.includes(role)) {
      res
        .status(401)
        .json({ msg: `The service requires one of these roles ${roles}` });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  hasPermittedRole,
};
