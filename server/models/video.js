module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define('video', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        videoPath: DataTypes.STRING,
        thumbnailPath: DataTypes.STRING,
    }, {})

    Video.associate = (models) => {
        Video.belongsTo(models.Folder, {
            foreignKey: 'folderId',
            as: 'folder'
        })
    }
    return Video
}