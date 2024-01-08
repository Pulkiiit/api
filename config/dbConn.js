const { Sequelize } = require("sequelize");

const DATABASE_NAME = "sequelize_db";
const DATABASE_USERNAME = "root";
const DATABASE_PASSWORD = "admin";

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: "13.233.149.246",
    dialect: "mysql",
  }
);

module.exports = sequelize;
