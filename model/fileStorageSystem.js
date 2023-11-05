module.exports = (sequelize, DataTypes) => {
    const fileStorage = sequelize.define("file_storage_system" , {
        component: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        base_url: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        base_url: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull:true
        },size: {
            type: DataTypes.INTEGER,
            allowNull:true
        },name: {
            type: DataTypes.STRING,
            allowNull:true
        },upload_ip: {
            type: DataTypes.STRING,
            allowNull:true
        },created_at: {
            type: DataTypes.INTEGER,
            allowNull:true
        },
    }, {
        tableName: "file_storage_item",
        underscored: true,
        timestamps: false
    })
    return fileStorage
}