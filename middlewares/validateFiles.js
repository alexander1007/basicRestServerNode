const { response, request } = require("express");

const validateFiles = (req = request, res = response, next) => {
  const { files } = req;
  if (!files || Object.keys(files).length === 0 || !files?.file) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }

  next();
};

module.exports = { validateFiles };
