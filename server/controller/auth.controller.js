const { registerService, loginService } = require("../service/auth.service");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Invalid Data." });
    }

    const user = await registerService({ name, email, password });
    return res
      .status(201)
      .json({ message: "User is created successfully.", user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await loginService({ email, password });
    return res.status(200).json({ message: "Login successfull.", token });
  } catch (error) {
    next(error);
  }
};
