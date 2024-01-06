const { Router } = require("express");
const { search } = require("../controllers");

const router = Router();

router.get("/:collection/:search", search);

module.exports = router;
