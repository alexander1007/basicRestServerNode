const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"],
  },
  email: {
    type: String,
    required: [true, "Email is mandatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is mandatory"],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// Se sobreescribe el metodo toJSON de mongo, es importante tener en cuenta que se debe
// sobreescribir con una función con la sintaxis function, se debe recordar que las
// funciones de flechas conservan el scope y para sobreescribir el metodo toJSON se
// necesita la instancia del this
UserSchema.methods.toJSON = function () {
  const { __v, password, _id: uid, ...user } = this.toObject();
  return { ...user, uid };
};

module.exports = model("User", UserSchema);
