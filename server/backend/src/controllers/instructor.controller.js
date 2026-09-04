const userModel = require("../models/user.model");

async function updateProfile(req, res) {
  try {
    const { bio } = req.body;
    const userId = req.user.userId;

    const updated = await userModel.updateBio(userId, bio || "");

    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { updateProfile };
