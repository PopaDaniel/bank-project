const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const e = require("express");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    min: 3,
    max: 30,
  },

  cnp: {
    type: String,
    required: true,
    min: 13,
  },

  phone: {
    type: String,
    required: true,
    min: 10,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  hash_password: {
    type: String,
    required: true,
    min: 4,
  },
  role: {
    type: String,
    enum: ["user", "admin", "super-admin"],
    default: "user",
  },
  authorized: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("hash_password")) {
    user.hash_password = await bcrypt.hash(user.hash_password, 8);
  }
  next();
});

// userSchema.methods = {
//   authenticate: function (password) {
//     if (password === this.hash_password) {
//       return "true";
//     }
//     // return "false";
//     else return bcrypt.compareSync(password, this.hash_password);
//   },
// };

userSchema.methods = {
  authenticate: function (password) {
    if (
      bcrypt.compareSync(password, this.hash_password) ||
      password === this.hash_password
    ) {
      return "true";
    }
    return "false";
  },
};

const User = mongoose.model("User", userSchema);
module.exports = User;

//module.exports = mongoose.model("User", userSchema);
