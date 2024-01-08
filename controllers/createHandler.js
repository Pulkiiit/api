const User = require("../model/user");
const bcrypt = require("bcrypt");
// if superadmin then send rel else no need
const createHandler = async (req, res) => {
  const { id, username, password, role, rel } = req.body;
  const owner = await User.findOne({
    attributes: ["id", "role"],
    where: { id: id },
  });
  if (!owner) return res.status(400).json({ message: "Bad Request" });
  if (owner.role === "Salesperson")
    return res.status(401).json({ message: "Unauthorized access" });
  if (owner.role === "SuperAdmin") {
    if (role === "Salesperson" || role === "BranchManager") {
      try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const user = await User.create({
          username: username,
          password: hashedPwd,
          role: role,
          rel: rel,
        });
        return res
          .status(201)
          .json({ message: `New User ${username} created!` });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    } else {
      return res.status(400).json({ message: "Illegal arguments" });
    }
  } else if (owner.role === "BranchManager") {
    if (role === "Salesperson") {
      try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const user = await User.create({
          username: username,
          password: hashedPwd,
          role: role,
          rel: owner.id,
        });
        return res.status(201).json({ message: `New User ${user} created!` });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    } else {
      return res.status(401).json({ message: "Illegal arguments" });
    }
  } else {
    return res.status(401).json({ message: "Unidentified role" });
  }
};

module.exports = createHandler;
