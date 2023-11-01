module.exports = (sequelize, DataTypes) => {
  const ArticleAttachment = sequelize.define("article_attachment", {
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    base_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.INTEGER,
      defaultValue: Math.floor(new Date(Date.now()).getTime() / 1000),
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: "article_attachment",
    underscored: true,
    timestamps: false
  });
  return ArticleAttachment;
};
