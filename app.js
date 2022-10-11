const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const jobRoutes = require("./routes/v1/job.routes");
const userRoutes = require("./routes/v1/user.routes");
const managerRoutes = require("./routes/v1/manager.routes");

app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/manager/jobs", managerRoutes);

app.get("/", (_req, res) => {
  res.send("Welcome to Job Portal");
});

app.get("*", (_req, res) => {
  res.send("Couldn't find the route");
});

module.exports = app;
