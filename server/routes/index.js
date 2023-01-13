const router = require("express").Router();
const authRoute = require("./auth.routes");
const userRoute = require("./user.routes");
const adminAttendanceRoute = require("./adminAttendance.routes");
const studentAttendanceRoute = require("./studentAttendance.routes");
const authenticate = require("../middleware/authenticate");

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", authenticate, userRoute);
router.use("/api/v1/admin/attendance", authenticate, adminAttendanceRoute);
router.use("/api/v1/student/attendance", authenticate, studentAttendanceRoute);

module.exports = router;
