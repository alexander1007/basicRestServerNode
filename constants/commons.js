const routesPaths = {
  auth: {
    path: "/api/auth",
    url: "../routes/auth.route",
  },
  categories: {
    path: "/api/categories",
    url: "../routes/categories.route",
  },
  products: {
    path: "/api/products",
    url: "../routes/products.route",
  },
  searches: {
    path: "/api/searches",
    url: "../routes/searches.route",
  },
  uploads: {
    path: "/api/uploads",
    url: "../routes/uploads.route",
  },
  users: {
    path: "/api/users",
    url: "../routes/user.route",
  },
};
const availableCollections = ["categories", "products", "roles", "users"];
const allowedExtension = ["png", "jpg", "jpeg", "gif"];

module.exports = { routesPaths, availableCollections, allowedExtension };
