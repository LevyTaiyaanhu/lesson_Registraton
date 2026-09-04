const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructor.controller");
const authenticate = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");

router.patch("/profile", authenticate, requireRole("INSTRUCTOR"), instructorController.updateProfile);

module.exports = router;
