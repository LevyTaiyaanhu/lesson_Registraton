const lessonModel = require("../models/lesson.model");

async function getLessons(req, res) {
  try {
    const lessons = await lessonModel.getAllLessons();

    const withCounts = await Promise.all(
      lessons.map(async (lesson) => ({
        ...lesson,
        joinedCount: await lessonModel.countJoined(lesson.id),
      }))
    );

    return res.status(200).json({ success: true, data: withCounts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getLesson(req, res) {
  try {
    const { id } = req.params;
    const lesson = await lessonModel.getLessonById(id);

    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson season not found" });
    }

    const joinedCount = await lessonModel.countJoined(id);

    return res.status(200).json({ success: true, data: { ...lesson, joinedCount } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function createLesson(req, res) {
  try {
    const { title, presenter, durationHrs, startDate, endDate, capacity } = req.body;

    if (!title || !presenter || !durationHrs || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "title, presenter, durationHrs, startDate and endDate are required",
      });
    }

    const lesson = await lessonModel.createLesson({
      title,
      presenter,
      durationHrs,
      startDate,
      endDate,
      capacity,
    });

    return res.status(201).json({ success: true, data: lesson });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { getLessons, getLesson, createLesson };
