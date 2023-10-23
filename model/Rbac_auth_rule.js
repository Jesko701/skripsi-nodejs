module.exports = (sequelize, DataTypes) => {
  const AuthRule = sequelize.define("rbac_auth_rule", {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
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
    tableName: 'rbac_auth_rule'
});
  return AuthRule;
};
