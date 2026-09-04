const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lesson.controller");
const authenticate = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");

router.get("/", authenticate, lessonController.getLessons);
router.get("/:id", authenticate, lessonController.getLesson);
router.post("/", authenticate, requireRole("INSTRUCTOR"), lessonController.createLesson);

module.exports = router;