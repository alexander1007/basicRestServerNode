const bcryptjs = require("bcryptjs");

const cryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
};

module.exports = { cryptPassword };
