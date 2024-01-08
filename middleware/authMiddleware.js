const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    "bcfewoubf32p479fb10934b09u134fb091uv904fb1043",
    (err, decoded) => {
      if (err) return res.sendStatus(403); //invlaid token
      req.payload = decoded.username;
      next();
    }
  );
};

module.exports = verifyToken;
