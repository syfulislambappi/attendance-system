const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findUserByProperty, createNewUser } = require("./user.service");
const error = require("../utils/error");

exports.registerService = async ({ name, email, password }) => {
  let user = await findUserByProperty("email", email);

  if (user) throw error("User is already exist", 400);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return createNewUser({ name, email, password: hash });
};

exports.loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);
  if (!user) throw error("Invalid Credentials", 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw error("Invalid Credentials", 400);

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  return jwt.sign(payload, "secret_key", { expiresIn: "1h" });
};
