const mongoose = require("mongoose");

const User = mongoose.model("users", {
  id: String,
  email: String,
  username: String,
  password: String,
});

module.exports = User;
