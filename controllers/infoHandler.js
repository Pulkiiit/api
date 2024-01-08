const User = require("../model/user");

const infoHandler = async (req, res, payload) => {
  const { id } = req.body;
  if (!id)
    return res.status(400).json({ message: "Missing required arguments: id" });
  const info = await User.findOne({ where: { id: id } });
  if (!info) return res.status(404).json({ message: "no such user" });
  if (info.username != req.payload)
    return res.status(400).json({ message: "Unauthorized Access" });
  return res.status(200).json(info);
};

module.exports = infoHandler;
