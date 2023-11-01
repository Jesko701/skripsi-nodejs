module.exports=(sequelize, DataTypes) => {
    const AuthItemChild = sequelize.define("rbac_auth_item_child", {
        parent: {
            type: DataTypes.STRING,
            primaryKey: false,
            allowNull: true,
        },
        child: {
            type: DataTypes.STRING,
            primaryKey: false,
            allowNull: true,
        }
    }, {
        tableName: 'rbac_auth_item_child',
        timestamps: false,
        freezeTableName: true
    })
    return AuthItemChild
}