const express = require("express");
const connectDatabase = require("./database");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json());

app.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Invalid Data." });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User is already existed." });
    }

    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;

    await user.save();

    return res
      .status(201)
      .json({ message: "User is created successfully.", user });
  } catch (error) {
    next(error);
  }
});

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    delete user._doc.password;

    return res.status(200).json({ message: "Login successfull.", user });
  } catch (error) {
    next(error);
  }
});

app.get("/", (_req, res, _next) => {
  res.send("Thank you for your request.");
});

app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).json({ message: "Server Error Occurred." });
});

connectDatabase(`mongodb://127.0.0.1:27017/attendanceSystem`)
  .then(() => {
    console.log("Database is connected");

    app.listen(4000, () => {
      console.log("I am listening at port 4000");
    });
  })
  .catch((e) => console.log(e.message));
