const { Schema, model } = require("mongoose");
const bycript = require("bcryptjs");

const UserSchema = new Schema({
  email: String,
  password: String,
});

module.exports = model("User", UserSchema);
