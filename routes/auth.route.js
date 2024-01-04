const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers");
const { validateFields } = require("../middlewares");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password is mandatory").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/google",
  [
    check("idToken", " Google id token is mandatory").not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);

module.exports = router;
