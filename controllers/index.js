const Auth = require("./auth.controller");
const Categories = require("./categories.controller");
const Products = require("./products.controller");
const Users = require("./users.controller");

module.exports = { ...Auth, ...Categories, ...Products, ...Users };
