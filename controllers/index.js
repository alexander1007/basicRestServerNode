const Auth = require("./auth.controller");
const Categories = require("./categories.controller");
const Products = require("./products.controller");
const Searches = require("./searches.controller");
const Uploads = require("./uploads.controller");
const Users = require("./users.controller");

module.exports = {
  ...Auth,
  ...Categories,
  ...Products,
  ...Searches,
  ...Uploads,
  ...Users,
};
