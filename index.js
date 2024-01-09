const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const bcrypt = require("bcrypt"); // different for linux
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/authMiddleware");
const sequelize = require("./config/dbConn");
// usernmae should be unique and you have to use id for work
const {
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = require("./config/dbConn");

const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

sequelize
  .authenticate()
  .then(() => console.log("Successfully connected to the database!"))
  .catch(error => console.log("Failed to connect the database:", error));

app.get("/", (req, res) => {
  return res.send("ok");
});
app.use("/login", require("./routes/login"));
app.use("/user", verifyToken, require("./routes/user"));
