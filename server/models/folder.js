module.exports = (sequelize, DataTypes) => {
    const Folder = sequelize.define('folder', {
        name: DataTypes.STRING,
    }, {})
    return Folder
}