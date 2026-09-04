const registrationModel = require("../models/registration.model");

async function getNotifications(req, res) {
  try {
    const userId = req.user.userId;
    const lessons = await registrationModel.getUserRegistrationsWithLessons(userId);

    const now = new Date();
    const upcoming = lessons.filter((lesson) => lesson.startDate > now);
    const missed = lessons.filter((lesson) => lesson.endDate < now);

    return res.status(200).json({ success: true, data: { upcoming, missed } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { getNotifications };
