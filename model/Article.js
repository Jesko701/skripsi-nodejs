module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("article", {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    view: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    thumbnail_base_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnail_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.INTEGER,
      defaultValue: Math.floor(Date.now()/1000)
    },
    updated_at : {
      type: DataTypes.INTEGER,
      defaultValue: Math.floor(Date.now()/1000)
    }
  }, {
    tableName: 'article'
  });
  return Article;
};
