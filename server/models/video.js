module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define('video', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        videoPath: DataTypes.STRING,
        thumbnailPath: DataTypes.STRING,
    }, {})
    return Video
}