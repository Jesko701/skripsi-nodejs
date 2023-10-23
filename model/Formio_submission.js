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
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.INTEGER,
      defaultValue: Math.floor(Date.now() / 1000),
    },
    updated_at: {
      type: DataTypes.INTEGER,
      defaultValue: Math.floor(Date.now() / 1000),
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
    tableName: 'formio_submissions'
  });
  return formio_submission;
};
