module.exports = (sequelize, DataTypes) => {
  const AuthAssignment = sequelize.define(
    "rbac_auth_assignment",
    {
      item_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: Math.floor(new Date(Date.now()).getTime() / 1000),
      },
    },
    {
      tableName: "rbac_auth_assignment",
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    }
  );
  return AuthAssignment;
};
