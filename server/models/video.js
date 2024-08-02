module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define('video', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'This video has no description.'
        },
        videoPath: {
            type: DataTypes.STRING,
            allowNull: false
        },
        thumbnailPath: {
            type: DataTypes.STRING,
            allowNull: false
        },
        serviceDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {})
    return Video
}