const express = require("express");
const connectDatabase = require("./database");
const authenticate = require("./middleware/authenticate");
const routes = require("./routes/index");

// Initialize app
const app = express();

// middlewares
app.use(express.json());

// routes
app.use(routes);

app.get("/private", authenticate, async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).json({ message: "Authorized", user });
  } catch (error) {
    next(error);
  }
});

app.get("/public", async (req, res, next) => {
  return res.status(200).json({ message: "I am public route." });
});

app.get("/", (_req, res, _next) => {
  res.send("Thank you for your request.");
});

app.use((err, _req, res, _next) => {
  console.log(err);
  if (!err.status) {
    res.status(500).json({ message: "Server Error Occurred." });
  } else {
    res.status(err.status).json({ message: err.message });
  }
});

connectDatabase(`mongodb://127.0.0.1:27017/attendanceSystem`)
  .then(() => {
    console.log("Database is connected");

    app.listen(4000, () => {
      console.log("I am listening at port 4000");
    });
  })
  .catch((e) => console.log(e.message));
