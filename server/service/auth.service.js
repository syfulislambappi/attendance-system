const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { findUserByProperty, createNewUser } = require("./user.service");

exports.registerService = async ({ name, email, password }) => {
  let user = await findUserByProperty("email", email);

  if (user) {
    const error = new Error("User is already exist");
    error.status = 400;
    throw error;
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return createNewUser({ name, email, password: hash });
};

exports.loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  delete user._doc.password;
  const token = jwt.sign(user._doc, "secret_key", { expiresIn: "1h" });
  return token;
};
