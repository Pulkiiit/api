const User = require("../model/user");
const { Op } = require("sequelize");
const listHandler = async (req, res) => {
  const { id } = req.body;
  if (!id)
    return res.status(400).json({ message: "Missing required arguments: id" });
  const owner = await User.findOne({ where: { id: id } });
  if (!owner) return res.status(400).json({ message: "Bad Request" });
  if (owner.username != req.payload)
    return res.status(400).json({ message: "Unauthorized Access" });
  if (owner.role === "Salesperson")
    return res.status(401).json({ message: "Unauthorized access" });
  if (owner.role === "SuperAdmin") {
    const users = await User.findAll({
      attributes: ["id", "username", "role", "rel"],
      where: { role: { [Op.ne]: "SuperAdmin" } },
    });
    if (!users)
      return res.status(200).json({ message: "No users registered currently" });
    return res.status(200).json(users);
  } else if (owner.role === "BranchManager") {
    const users = await User.findAll({
      attributes: ["id", "username", "role"],
      where: { role: "Salesperson", rel: owner.id },
    });
    if (!users)
      return res
        .status(200)
        .json({ message: "No Salesperson assigned to you roght now" });
    return res.status(200).json(users);
  } else {
    return res.status(401).json({ message: "Unidentified role" });
  }
};

module.exports = listHandler;
