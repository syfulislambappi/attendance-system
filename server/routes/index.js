const router = require("express").Router();
const authRoute = require("./auth.routes");

router.use("/api/v1/auth", authRoute);

module.exports = router;
