  
const { Sequelize } = require("sequelize")

const db = new Sequelize ("data_warehouse", "root", "", { 
    host: "localhost",
    port: 3306,
    dialect: "mysql"
}
)

module.exports = { db }