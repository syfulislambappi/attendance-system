const router = require("express").Router();
const authRoute = require("./auth.routes");
const userRoute = require("./user.routes");

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", userRoute);

module.exports = router;
