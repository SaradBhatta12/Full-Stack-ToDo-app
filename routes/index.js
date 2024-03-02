const express = require("express");
const router = express.Router();

const user = require("../models/user.models");
const task = require("../models/task.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isauthenticate = require("../middleware/isauthenticate");

mongoose
  .connect(process.env.MONGO, {
    dbName: "trail",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to MongoDB successful");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

router.get("/login", (req, res) => {
  res.render("login", { message: req.flash("error") });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await user.findOne({ email });

    if (!userRecord) {
      req.flash("error", "User not found. Please sign up.");
      return res.redirect("/login");
    }

    const isPasswordValid = await bcrypt.compare(password, userRecord.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign({ id: userRecord._id }, "jsisiiiauusj");
    res.cookie("token", token);
    res.redirect("/");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User successfully created. You can now log in.",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.redirect("/signup");
  }
});

router.get("/", isauthenticate, async (req, res) => {
  try {
    const userRecord = req.User;
    const taskData = await task.find({ user: userRecord._id });
    res.render("index", { taskData, error: req.flash("error") });
  } catch (error) {
    console.error("Error rendering index:", error);
    res.redirect("/login");
  }
});

router.post("/", isauthenticate, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const existingTask = await task.findOne({ title });

    if (existingTask) {
      return res.redirect("/");
    }

    const newTask = await task.create({ title, desc, user: req.User });
    res.status(201).json({
      success: true,
      message: "Task successfully created.",
    });
  } catch (error) {
    req.flash("error", "Add description and . Please try again.");
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.redirect("/login");
});

router.get("/delete/:id", isauthenticate, async (req, res) => {
  try {
    await task.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
