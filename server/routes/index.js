const router = require("express").Router();
const authRoute = require("./auth.routes");
const userRoute = require("./user.routes");
const authenticate = require("../middleware/authenticate");

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", authenticate, userRoute);

module.exports = router;
