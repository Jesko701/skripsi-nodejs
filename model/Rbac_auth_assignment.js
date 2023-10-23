module.exports=(sequelize, DataTypes) => {
    const AuthAssignment = sequelize.define("rbac_auth_assignment", {
        item_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        created_at: {
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue: Math.floor(Date.now() / 1000),
        }
    }, {
        tableName: 'rbac_auth_assignment'
    })
    return AuthAssignment
}