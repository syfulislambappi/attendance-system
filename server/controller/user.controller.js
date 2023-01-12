const User = require("../models/User");
const userService = require("../service/user.service");

exports.getUsers = async (req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select
   */
  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = (req, res, next) => {};

exports.postUser = (req, res, next) => {};

exports.putUserById = (req, res, next) => {};

exports.patchUserById = (req, res, next) => {};

exports.deleteUserById = (req, res, next) => {};
