const User = require("../model/user");
const bcrypt = require("bcrypt");
const createHandler = async (req, res) => {
  const { name, username, password, role } = req.body;
  const owner = await User.findOne({ where: { username: name } });
  if (!owner) return res.status(400).json({ message: "Uauthorized access" });
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
          rel: owner.username,
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
          rel: owner.username,
        });
        return res.status(201).json({ message: `New User ${user} created!` });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    } else {
      return res.status(401).json({ message: "Illegal arguments" });
    }
  } else {
    return res.status(401).json({ message: "invalid role" });
  }
};

module.exports = createHandler;
