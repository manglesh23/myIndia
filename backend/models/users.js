const mongoose = require("mongoose");
const { type } = require("os");
const bcrypt = require("bcrypt");

/* -------------------------------------------------------------------------- */
/*                                 User Schema                                */
/* -------------------------------------------------------------------------- */

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobilenumber: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/* -------------------------------------------------------------------------- */
/*                              PASSWORD HELPERS                              */
/* -------------------------------------------------------------------------- */
/**
 * Encrypt password before saving users objects int database we need to run
 * this encrypt than save it. (pre save)
 */
UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    // mix the 10 length random characters with user password => output the hash
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

/**
 * this function to compare password
 * @param {String} password
 * @returns {boolean}
 */

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
// export User Schema
module.exports = mongoose.model("User", UserSchema);
