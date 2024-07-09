module.exports = (sequelize, DataTypes) => {
    const Folder = sequelize.define('folder', {
        name: DataTypes.STRING,
    }, {})

    Folder.associate = (models) => {
        Folder.hasMany(models.Video, {
            foreignKey: 'folderId',
            as: 'videos'
        })
    }
    return Folder
}