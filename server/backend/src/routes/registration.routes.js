const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registration.controller");
const authenticate = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");

router.post("/:seasonId/join", authenticate, registrationController.join);
router.patch("/:id/reject", authenticate, requireRole("INSTRUCTOR"), registrationController.reject);
router.get("/:seasonId/count", authenticate, registrationController.getJoinedCount);
router.get("/lesson/:id", authenticate, requireRole("INSTRUCTOR"), registrationController.getByLesson);

module.exports = router;