const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/authMiddleware");
const sequelize = require("./config/dbConn");

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

app.use("/login", require("./routes/login"));
app.use("/user", verifyToken, require("./routes/user"));
// app.use('/create', (req, res) => {

// })
