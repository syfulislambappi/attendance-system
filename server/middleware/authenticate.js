const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unathorized" });
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "secret_key");
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unathorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Invalid Token", error: error });
  }
};

module.exports = authenticate;
