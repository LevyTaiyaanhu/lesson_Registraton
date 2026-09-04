const registrationModel = require("../models/registration.model");
const lessonModel = require("../models/lesson.model");

async function join(req, res) {
  try {
    const { seasonId } = req.params;
    const userId = req.user.userId;

    const lesson = await lessonModel.getLessonById(seasonId);
    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson season not found" });
    }

    const registration = await registrationModel.joinLesson(userId, seasonId);

    return res.status(200).json({ success: true, data: registration });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function reject(req, res) {
  try {
    const { id } = req.params;

    const existing = await registrationModel.getRegistrationById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    await registrationModel.removeRegistration(id);

    return res.status(200).json({ success: true, message: "Registration removed" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getJoinedCount(req, res) {
  try {
    const { seasonId } = req.params;
    const joinedCount = await registrationModel.countJoined(seasonId);
    return res.status(200).json({ success: true, data: { seasonId, joinedCount } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getByLesson(req, res) {
  try {
    const { id } = req.params;
    const lesson = await lessonModel.getLessonById(id);
    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson season not found" });
    }

    const registrations = await registrationModel.getRegistrationsByLesson(id);
    return res.status(200).json({ success: true, data: registrations });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { join, reject, getJoinedCount, getByLesson };