const userService = require("../service/user.service");
const error = require("../utils/error");
const authService = require("../service/auth.service");

exports.getUsers = async (_req, res, next) => {
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

exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.findUserByProperty("_id", userId);

    if (!user) {
      throw error("User is not found", 404);
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.putUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, email, roles, accountStatus } = req.body;

  try {
    const user = await userService.updateUser(userId, {
      name,
      email,
      roles,
      accountStatus,
    });

    if (!user) throw error("User is not found", 404);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.patchUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, roles, accountStatus } = req.body;

  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) throw error("User is not found", 404);

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userService.findUserByProperty("_id", userId);

    if (!user) throw error("User is not found", 404);

    await user.remove();
    return res.status(203).send();
  } catch (error) {
    next(error);
  }
};
