const prisma = require("./prismaClient");

async function findRegistration(userId, seasonId) {
  return prisma.registration.findUnique({
    where: { userId_seasonId: { userId, seasonId } },
  });
}

async function joinLesson(userId, seasonId) {
  return prisma.registration.upsert({
    where: { userId_seasonId: { userId, seasonId } },
    create: { userId, seasonId, status: "JOINED" },
    update: { status: "JOINED" },
  });
}

async function getRegistrationById(id) {
  return prisma.registration.findUnique({ where: { id } });
}

async function removeRegistration(id) {
  return prisma.registration.delete({ where: { id } });
}

async function countJoined(seasonId) {
  return prisma.registration.count({
    where: { seasonId, status: "JOINED" },
  });
}

async function getRegistrationsByLesson(seasonId) {
  const registrations = await prisma.registration.findMany({
    where: { seasonId },
    include: { user: { select: { fullName: true, email: true } } },
    orderBy: { createdAt: "asc" },
  });

  return registrations.map((r) => ({
    id: r.id,
    status: r.status,
    studentName: r.user.fullName,
    studentEmail: r.user.email,
  }));
}

async function getUserRegistrationsWithLessons(userId) {
  const registrations = await prisma.registration.findMany({
    where: { userId, status: "JOINED" },
    include: { season: true },
    orderBy: { season: { startDate: "asc" } },
  });

  return registrations.map((r) => r.season);
}

module.exports = {
  findRegistration,
  joinLesson,
  getRegistrationById,
  removeRegistration,
  countJoined,
  getRegistrationsByLesson,
  getUserRegistrationsWithLessons,
};
