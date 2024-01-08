const User = require("../model/user");

const infoHandler = async (req, res) => {
  const { id } = req.body;
  const info = await User.findOne({ where: { id: id } });
  if (!info) return res.status(400).json({ message: "Unauthorized access" });
  return res.status(200).json(info);
};

module.exports = infoHandler;
