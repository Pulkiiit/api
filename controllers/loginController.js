const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .sendStatus(400)
        .json({ message: "Username or Password are required." });
    }

    const foundUser = await User.findOne({ where: { username: username } });
    if (!foundUser) return res.sendStatus(401);
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(401).json({ error: "Authentication Failed" });
    }
    const token = jwt.sign(
      { username: username },
      "bcfewoubf32p479fb10934b09u134fb091uv904fb1043",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login Failed" });
  }
};

module.exports = handleLogin;
