const mongoose = require("mongoose");
const taskmodel = mongoose.model(
  "task",
  mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    createdAt: { type: Date, default: Date.now() },
  })
);

module.exports = taskmodel;
