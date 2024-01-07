const User = require("../model/user");

const infoHandler = async (req, res) => {
  const { username } = req.body;
  const info = await User.findOne({ where: { username: username } });
  if (!info) return res.status(400).json({ message: "Unauthorized access" });
  return res.status(200).json(info);
};

module.exports = infoHandler;
