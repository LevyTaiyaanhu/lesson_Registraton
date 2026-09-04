const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const lessonRoutes = require("./routes/lesson.routes");
const registrationRoutes = require("./routes/registration.routes");
const notificationRoutes = require("./routes/notification.routes");
const instructorRoutes = require("./routes/instructor.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/instructors", instructorRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

module.exports = app;