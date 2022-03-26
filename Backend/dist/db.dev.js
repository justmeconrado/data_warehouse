"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize;

var db = new Sequelize("data_warehouse", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql"
});
module.exports = {
  db: db
};