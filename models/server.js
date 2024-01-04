const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
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
      users: {
        path: "/api/users",
        url: "../routes/user.route",
      },
    };
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }
  routes() {
    const paths = Object.keys(this.paths);
    paths.forEach((element) => {
      const { path, url } = this.paths[element];
      this.app.use(path, require(url));
    });
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
