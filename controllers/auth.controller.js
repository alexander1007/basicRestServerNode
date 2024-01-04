const { response, request } = require("express");
const { User } = require("../models");
const { comparePassword, generateJWT, googleVerify } = require("../helpers");

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

const googleSignIn = async (req = request, res = response) => {
  const {
    body: { idToken },
  } = req;

  try {
    const { name, picture, email } = await googleVerify(idToken);
    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: "::",
        image: picture,
        google: true,
        role: "USER",
      };
      user = new User(data);
      await user.save();
    }

    const { status, id } = user;
    if (!status) {
      return res.status(401).json({ msg: "Inactive user" });
    }
    const token = await generateJWT(id);
    res.json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Can´t validate google id token" });
  }
};

module.exports = { login, googleSignIn };
