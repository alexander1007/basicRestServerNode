const mongoose = require("mongoose");

const {
  env: { MONGO_DB: connection },
} = process;

const dbConnection = async () => {
  try {
    await mongoose.connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database online");
  } catch (error) {
    throw new Error("Can´t initialize DB");
  }
};

module.exports = {
  dbConnection,
};
