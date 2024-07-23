module.exports = (sequelize, DataTypes) => {
    const Folder = sequelize.define('folder', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    }, {})
    return Folder
}