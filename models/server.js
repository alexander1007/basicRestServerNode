const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnection } = require("../database/config");
const { routesPaths } = require("../constants/commons");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = routesPaths;
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
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
