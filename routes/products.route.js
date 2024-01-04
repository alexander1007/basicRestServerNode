const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, validateJWT, isAdminRole } = require("../middlewares");
const { existProduct, existCategory } = require("../helpers");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers");

const router = Router();

router.get("/", [validateJWT, validateFields], getProducts);
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "It´s not an invalid ID").isMongoId(),
    check("id").custom(existProduct),
    validateFields,
  ],
  getProductById
);
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is mandatory").not().isEmpty(),
    check("category", "Category is mandatory").not().isEmpty(),
    check("category", "It´s not an invalid ID").isMongoId(),
    check("category").custom(existCategory),
    validateFields,
  ],
  createProduct
);
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "It´s not an invalid ID").isMongoId(),
    check("category", "It´s not an invalid ID").isMongoId(),
    check("id").custom(existProduct),
    check("category").custom(existCategory),
    validateFields,
  ],
  updateProduct
);
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "It´s not an invalid ID").isMongoId(),
    check("id").custom(existProduct),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
