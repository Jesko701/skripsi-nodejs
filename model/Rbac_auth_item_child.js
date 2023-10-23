module.exports=(sequelize, DataTypes) => {
    const AuthItemChild = sequelize.define("rbac_auth_item_child", {
        parent: {
            type: DataTypes.STRING,
            allowNull: true
        },
        child: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        tableName: 'rbac_auth_item_child'
    })
    return AuthItemChild
}