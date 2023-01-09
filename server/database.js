const mongoose = require("mongoose");

const connectDatabase = (connectionStr) => {
  return mongoose.connect(connectionStr);
};

module.exports = connectDatabase;
