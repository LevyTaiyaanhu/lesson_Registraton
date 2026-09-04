const prisma = require("./prismaClient");

async function getAllLessons() {
  return prisma.lessonSeason.findMany({ orderBy: { startDate: "asc" } });
}

async function getLessonById(id) {
  return prisma.lessonSeason.findUnique({ where: { id } });
}

async function createLesson({ title, presenter, durationHrs, startDate, endDate, capacity }) {
  return prisma.lessonSeason.create({
    data: {
      title,
      presenter,
      durationHrs: Number(durationHrs),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      capacity: capacity ? Number(capacity) : null,
    },
  });
}

async function countJoined(seasonId) {
  return prisma.registration.count({
    where: { seasonId, status: "JOINED" },
  });
}

module.exports = { getAllLessons, getLessonById, createLesson, countJoined };
