const User = require("../model/user");

const infoHandler = async (req, res, payload) => {
  const username = req.payload;
  const info = await User.findOne({ where: { username: username } });
  if (!info)
    return res.status(404).json({ message: "No user logged in right now" });
  return res.status(200).json(info);
};

module.exports = infoHandler;
