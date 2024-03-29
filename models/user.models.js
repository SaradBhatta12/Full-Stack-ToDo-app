const mongoose = require("mongoose");
const usermodel = mongoose.model(
  "user",
  mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
  })
);

module.exports = usermodel;
