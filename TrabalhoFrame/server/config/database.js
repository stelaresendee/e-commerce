const { Sequelize } = require('sequelize')

const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage: './config/cardb.sqlite',
})

module.exports = sequelize