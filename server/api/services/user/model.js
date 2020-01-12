import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import moment from "moment-timezone";

import { jwtSecret, jwtExpirationInterval } from "../../../config/vars";

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 128
  }
});

userSchema.pre("save", async function(next) {
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Create hash
    const hash = await bcrypt.hash(this.password, salt);

    // Assign text password to hashed password
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.generateToken = function(user) {
  const payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment()
      .add(jwtExpirationInterval, "minutes")
      .unix()
  };

  return JWT.sign(payload, jwtSecret);
};

userSchema.methods.isValidPassword = async function(newPassword) {
  return bcrypt.compare(newPassword, this.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
