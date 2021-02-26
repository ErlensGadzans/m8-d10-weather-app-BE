const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  email: String,
  password: String,
  googleId: String,
});

UserSchema.statics.findByCredentials = async function (email, plainPassword) {
  const user = await this.findOne({ email: email }); //FIRST LOOKING FOR USERNAME IN LIST. "THIS" IS SEARCHING FROM SCHEMA

  if (user) {
    //IF THERE IS A USER, THEN ARE LOOKIN FOR PASWORD TO MATCH
    const isMatch = await bcrypt.compare(plainPassword, user.password);
    if (isMatch) return user;
  } else {
    // ELSE RETURN NULL
    return null;
  }
};

UserSchema.pre("save", async function (next) {
  //pre saving users data
  const user = this;
  const plainPassword = user.password;

  if (user.isModified("password")) {
    // modifying pasword of user
    user.password = await bcrypt.hash(plainPassword, 12);
  }
  next();
});

module.exports = model("User", UserSchema);
