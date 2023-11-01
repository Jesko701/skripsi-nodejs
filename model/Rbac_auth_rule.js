module.exports = (sequelize, DataTypes) => {
  const AuthRule = sequelize.define("rbac_auth_rule", {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    data: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: Math.floor(new Date(Date.now()).getTime() / 1000),
    },
    updated_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: Math.floor(new Date(Date.now()).getTime() / 1000),
    },
  }, {
    tableName: 'rbac_auth_rule',
    underscored: true,
    timestamps: false
});
  return AuthRule;
};
