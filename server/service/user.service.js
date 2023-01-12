const User = require("../models/User");

exports.findUsers = () => {
  return User.find();
};

exports.findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

exports.createNewUser = ({ name, email, password }) => {
  const user = new User({ name, email, password });
  return user.save();
};
