const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const {
  env: { SECRET_KEY: key },
} = process;

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token-apiKey");

  if (!token) {
    return res.status(401).json({ msg: "There´s no token in request" });
  }

  try {
    const { uid } = jwt.verify(token, key);
    const authenticatedUser = await User.findById(uid);
    if (!authenticatedUser || !authenticatedUser.status) {
      res.status(401).json({ msg: "Invalid token" });
    }
    req.authUser = authenticatedUser;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = {
  validateJWT,
};
