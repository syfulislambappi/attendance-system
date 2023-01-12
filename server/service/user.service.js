const User = require("../models/User");
const error = require("../utils/error");

exports.findUsers = () => {
  return User.find();
};

exports.findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

exports.updateUser = async (id, data) => {
  const user = await this.findUserByProperty("email", data.email);
  if (user) throw error("Email is already in use", 400);

  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

exports.createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return user.save();
};
