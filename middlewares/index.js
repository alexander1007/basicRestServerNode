const validateFields = require("./validateFields");
const validateJWT = require("./validateJWT");
const validateRoles = require("./validateRoles");
const validateFiles = require("./validateFiles");

module.exports = {
  ...validateFields,
  ...validateFiles,
  ...validateJWT,
  ...validateRoles,
};
