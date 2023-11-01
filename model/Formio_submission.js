module.exports = (sequelize, DataTypes) => {
  const formio_submission = sequelize.define("formio_submissions", {
    form_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    data: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.INTEGER,
      defaultValue: Math.floor(new Date(Date.now()).getTime() / 1000),
    },
    updated_at: {
      type: DataTypes.INTEGER,
      defaultValue: Math.floor(new Date(Date.now()).getTime() / 1000),
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deleted: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'formio_submissions',
    underscored: true,
    timestamps: false
  });
  return formio_submission;
};
