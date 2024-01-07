const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConn");

const User = sequelize.define("user", {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
  rel: DataTypes.STRING,
});

sequelize
  .sync()
  .then(() => {
    console.log("User table created successfully!");
  })
  .catch(error => {
    console.error("Unable to create table : ", error);
  });

module.exports = User;
