module.exports = (sequelize, DataTypes) => {
  const formio_forms = sequelize.define("formio_forms", {
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
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
    id_tema: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_only_kordes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_only_dosen: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_harus_login: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'formio_forms'
  });
  return formio_forms;
};
