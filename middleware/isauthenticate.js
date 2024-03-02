const jwt = require("jsonwebtoken");
const user = require("../models/user.models");

const isauthenticate = async (req, res, next) => {
  let token = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "token expire please login first",
    });
  }

  try {
    const decoded = await jwt.verify(token.token, "jsisiiiauusj");
    req.User = await user.findById(decoded.id);
  } catch (error) {
    res.redirect("/login");
  }

  next();
};

module.exports = isauthenticate;
