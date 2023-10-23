module.exports = (sequelize, DataTypes) => {
  const AuthItem = sequelize.define("rbac_auth_item", {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rule_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    data: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: Math.floor(Date.now() / 1000),
    },
    updated_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: Math.floor(Date.now() / 1000),
    },
  }, {
    tableName: 'rbac_auth_item'
});
  return AuthItem;
};
