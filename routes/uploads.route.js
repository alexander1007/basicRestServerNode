const { Router } = require("express");
const { check } = require("express-validator");
const { uploadFile, updateFile, getFileById } = require("../controllers");
const { allowedCollections } = require("../helpers");
const { validateFields, validateFiles } = require("../middlewares");

const router = Router();

router.post("/", validateFiles, uploadFile);
router.put(
  "/:collection/:id",
  [
    validateFiles,
    check("id", "It´s not an invalid ID").isMongoId(),
    check("collection").custom((collection) =>
      allowedCollections(collection, ["users", "products"])
    ),
    validateFields,
  ],
  updateFile
);
router.get(
  "/:collection/:id",
  [
    check("id", "It´s not an invalid ID").isMongoId(),
    check("collection").custom((collection) =>
      allowedCollections(collection, ["users", "products"])
    ),
    validateFields,
  ],
  getFileById
);

module.exports = router;
