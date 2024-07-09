require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize('server', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
})

const db = {}
db.sequelize = sequelize
db.models = {}
db.models.User = require('./user')(sequelize, Sequelize.DataTypes)
db.models.Video = require('./video')(sequelize, Sequelize.DataTypes)
db.models.Folder = require('./folder')(sequelize, Sequelize.DataTypes)

module.exports = db