const path = require("path");
const fs = require("fs");
const { response, request } = require("express");
const { saveFile } = require("../helpers");
const { Product, User } = require("../models");

const collectionsInfo = {
  products: {
    model: Product,
    name: "Product",
  },
  users: {
    model: User,
    name: "User",
  },
};

const uploadFile = async (req = request, res = response) => {
  try {
    const { files } = req;
    const extensions = ["svg", "txt"];
    const uploadedFileName = await saveFile(files, extensions, "svg");
    res.status(201).json({ msg: `File name ${uploadedFileName}` });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updateFile = async (req = request, res = response) => {
  const {
    params: { collection, id },
    files,
  } = req;

  const { model, name } = collectionsInfo[collection];
  const localCollection = await model.findById(id);

  if (!localCollection) {
    return res
      .status(400)
      .json({ msg: `Doesn´t exists ${name} with id ${id}` });
  }
  const { image } = localCollection;
  if (image) {
    const pathImage = path.join(__dirname, "../uploads", collection, image);
    // flujo de eliminación de imagen para solo tener la última imagen cargada en el server por colección
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  try {
    const uploadedFileName = await saveFile(files, undefined, collection);
    localCollection.image = uploadedFileName;
    await localCollection.save();
  } catch (msg) {
    res.status(400).json({ msg });
  }

  return res.json({ model: localCollection });
};

const getFileById = async (req = request, res = response) => {
  const {
    params: { collection, id },
  } = req;

  const { model } = collectionsInfo[collection];
  const localCollection = await model.findById(id);
  const noImagePath = path.join(__dirname, "../assets/no-image.jpg");

  if (!localCollection) {
    return res.sendFile(noImagePath);
  }

  const { image } = localCollection;
  if (image) {
    const pathImage = path.join(__dirname, "../uploads", collection, image);
    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }

  return res.sendFile(noImagePath);
};

module.exports = { uploadFile, updateFile, getFileById };
