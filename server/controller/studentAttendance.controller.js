const StudentAttendance = require("../models/StudentAttendance");
const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");

exports.getAttendance = async (req, res, next) => {
  const { id } = req.params;

  try {
    const adminAttendance = await AdminAttendance.findById(id);

    if (!adminAttendance) throw error("Invalid Attendance ID", 400);
    if (adminAttendance.status === "COMPLETED")
      throw error("Attendance is already completed", 400);

    let attendance = await StudentAttendance.findOne({
      user: req.user._id,
      adminAttendance: id,
    });

    if (attendance) throw error("Already attended", 400);

    attendance = new StudentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });

    await attendance.save();

    return res.status(201).json(attendance);
  } catch (error) {
    next(error);
  }
};

exports.getAttendanceStatus = async (_req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) throw error("Attendance is not running", 400);

    const started = addMinutes(new Date(running.createdAt), running.timeLimit);

    if (isAfter(new Date(), started)) {
      (running.status = "COMPLETED"), await running.save();
    }

    return res.status(200).json(running);
  } catch (error) {
    next(error);
  }
};
