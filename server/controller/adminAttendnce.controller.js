const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");

exports.getEnable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (running) throw error("Another attendance is running", 400);

    const attendance = new AdminAttendance({});
    await attendance.save();
    return res.status(201).json({ message: "Success", attendance });
  } catch (error) {
    next(error);
  }
};

exports.getStatus = async (req, res, next) => {
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

exports.getDisable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) throw error("Attendance is not running", 400);

    running.status = "COMPLETED";
    await running.save();

    return res.status(200).json(running);
  } catch (error) {
    next(error);
  }
};
