const { response, request } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Category, Product, Role, User } = require("../models");
const { availableCollections } = require("../constants/commons");

const searchByCollection = {
  categories: {
    model: Category,
    terms: ["name"],
  },
  products: {
    model: Product,
    terms: ["name"],
  },
  roles: {
    model: Role,
    terms: ["role"],
  },
  users: {
    model: User,
    terms: ["name", "email"],
  },
};

const globalSearch = async (params, res = response) => {
  const { collection, search } = params;
  const { model, terms } = searchByCollection[collection];
  const isMongoID = ObjectId.isValid(search);

  if (isMongoID) {
    const result = await model.findById(search);
    return res.json({
      results: result ? [result] : [],
    });
  }

  const regexSearch = new RegExp(search, "i");
  let newArray = terms.map((item) => {
    const obj = {};
    obj[item] = regexSearch;
    return obj;
  });

  const results = await model.find({
    $or: newArray,
    $and: [{ status: true }],
  });
  return res.json({
    results: results ? results : [],
  });
};

const search = async (req = request, res = response) => {
  const {
    params: { collection, search },
  } = req;

  if (!availableCollections.includes(collection)) {
    return res
      .status(400)
      .json({ msg: `Collection ${collection} doesn´t exist` });
  }

  globalSearch({ collection, search }, res);
};

module.exports = { search };
