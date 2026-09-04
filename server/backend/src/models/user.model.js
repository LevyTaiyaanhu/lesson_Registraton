const prisma = require("./prismaClient");

const SAFE_FIELDS = {
  id: true,
  email: true,
  fullName: true,
  role: true,
  bio: true,
  createdAt: true,
};

async function findByEmail(email) {
  // include the password hash here - only used internally by auth.controller
  // to compare against the submitted password
  return prisma.user.findUnique({ where: { email } });
}

async function findById(id) {
  return prisma.user.findUnique({ where: { id }, select: SAFE_FIELDS });
}

async function createUser({ email, fullName, password, role }) {
  return prisma.user.create({
    data: { email, fullName, password, role: role || "STUDENT" },
    select: SAFE_FIELDS,
  });
}

async function updateBio(id, bio) {
  return prisma.user.update({
    where: { id },
    data: { bio },
    select: SAFE_FIELDS,
  });
}

module.exports = { findByEmail, findById, createUser, updateBio };
