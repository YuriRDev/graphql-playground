const mongoose = require("mongoose");

const Post = mongoose.model("posts", {
  id: String,
  title: String,
  content: String,
  author: String,
});

module.exports = Post;
