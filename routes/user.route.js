const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const {
  isValidRole,
  isEmailValid,
  existUserById,
} = require("../helpers/dbValidators");

const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
} = require("../controllers/users.controller");

const router = Router();

router.get("/", usersGet);
router.put(
  "/:id",
  [
    check("id", "It´s not an invalid ID").isMongoId(),
    check("id").custom(existUserById),
    check("role").custom(isValidRole),
    validateFields,
  ],
  usersPut
);
router.post(
  "/",
  [
    check("name", "Name in mandatory").not().isEmpty(),
    check(
      "password",
      "Password is mandatory and must be larger than 6 chars"
    ).isLength({ min: 6 }),
    check("email").custom(isEmailValid),
    check("role").custom(isValidRole),
    validateFields,
  ],
  usersPost
);
router.delete(
  "/:id",
  [
    check("id", "It´s not an invalid ID").isMongoId(),
    check("id").custom(existUserById),
    validateFields,
  ],
  usersDelete
);
router.patch("/", usersPatch);

module.exports = router;
