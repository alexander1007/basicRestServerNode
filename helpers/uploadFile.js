const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { allowedExtension } = require("../constants/commons");

const saveFile = ({ file }, extensions = allowedExtension, folder = "") => {
  return new Promise((resolve, reject) => {
    const { name: fileName } = file;
    const splitName = fileName.split(".");
    const ext = splitName[splitName.length - 1];

    if (!extensions.includes(ext.toLowerCase())) {
      return reject(`Extension ${ext} it´s not allowed`);
    }

    const tempFileName = `${uuidv4()}.${ext}`;
    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      folder,
      tempFileName
    );
    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(tempFileName);
    });
  });
};

module.exports = { saveFile };
