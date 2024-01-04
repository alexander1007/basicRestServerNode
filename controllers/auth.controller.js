const { response, request } = require("express");
const User = require("../models/user.model");
const { comparePassword } = require("../helpers/crypt");
const { generateJWT } = require("../helpers/jwt");

const login = async (req = request, res = response) => {
  const {
    body: { email, password },
  } = req;

  try {
    const user = await User.findOne({ email });
    const { status, id, password: userPassword } = user;

    if (!user || !status || !comparePassword(password, userPassword)) {
      res.status(400).json({ msg: "User or password incorrect - email" });
    }

    const token = await generateJWT(id);
    res.json({ user, token });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = { login };
