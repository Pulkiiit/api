const User = require("../model/user");

const deleteHandler = async (req, res) => {
  const { id } = req.body;
  if (!id)
    return res.status(400).json({ message: "Missing required arguments: id" });
  const { userId } = req.params;
  console.log(userId);
  const owner = await User.findOne({
    attributes: ["id", "role", "username"],
    where: { id: id },
  });
  if (!owner) return res.status(400).json({ message: "Bad Request" });
  if (owner.username != req.payload)
    return res.status(400).json({ message: "Unauthorized Access" });
  if (owner.role === "Salesperson")
    return res.status(400).json({ message: "Unauthoried access" });
  if (owner.role === "SuperAdmin") {
    const user = await User.findOne({
      attributes: ["id", "role"],
      where: { id: userId },
    });
    if (!user) return res.status(404).json({ message: "No such user found" });
    if (user.role === "Salesperson") {
      await User.destroy({ where: { id: userId } });
      return res.status(200).json({ message: "Deleted Successfully" });
    } else if (user.role === "BranchManager") {
      await User.destroy({ where: { rel: user.id } });
      await User.destroy({ where: { id: user.id } });
      return res.status(200).json({ message: "Deleted Successfully" });
    }
  } else if (owner.role === "BranchManager") {
    const user = await User.findOne({
      attributes: ["id"],
      where: { id: userId, rel: owner.id },
    });
    if (!user) return res.status(404).json({ message: "No such user found." });
    await User.destroy({ where: { id: userId } });
    return res.status(200).json({ message: "Deleted Successfully" });
  } else {
    return res.status(401).json({ message: "Unidentified role" });
  }
};

module.exports = deleteHandler;
