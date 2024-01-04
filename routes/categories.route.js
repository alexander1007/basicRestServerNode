const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, validateJWT, isAdminRole } = require("../middlewares");
const { existCategory } = require("../helpers");
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers");

const router = Router();

router.get("/", [validateJWT, validateFields], getCategories);
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "It´s not an invalid ID").isMongoId(),
    check("id").custom(existCategory),
    validateFields,
  ],
  getCategoryById
);
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name in mandatory").not().isEmpty(),
    validateFields,
  ],
  createCategory
);
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "It´s not an invalid ID").isMongoId(),
    check("name", "Name in mandatory").not().isEmpty(),
    check("id").custom(existCategory),
    validateFields,
  ],
  updateCategory
);
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "It´s not an invalid ID").isMongoId(),
    check("id").custom(existCategory),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
