const mongoose = require("mongoose");
const { type } = require("os");
const bcrypt = require("bcrypt");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  mobilenumber: {
    type: String,
    require: true,
  },
  emailId: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    return next();
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
