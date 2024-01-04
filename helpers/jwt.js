const jwt = require("jsonwebtoken");
const {
  env: { SECRET_KEY: key },
} = process;

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, key, { expiresIn: "4h" }, (err, token) => {
      if (err) {
        reject("Can´t generate token");
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = { generateJWT };
