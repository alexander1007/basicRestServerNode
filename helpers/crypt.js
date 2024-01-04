const bcryptjs = require("bcryptjs");

const cryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
};

const comparePassword = (password, userPassword) => {
  return bcryptjs.compareSync(password, userPassword);
};

module.exports = { cryptPassword, comparePassword };
