module.exports = (sequelize, DataTypes) => {
    const ArticleCategory = sequelize.define("article_category", {
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
          allowNull: true
        },
        parent_id: {
          type: DataTypes.INTEGER,
          allowNull: true, // Update this based on your requirements
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        created_at: {
            type: DataTypes.INTEGER,
            defaultValue: Math.floor(Date.now() / 1000)
        },
        updated_at: {
            type: DataTypes.INTEGER,
            defaultValue: Math.floor(Date.now() / 1000)
        }
      }, {
        tableName: 'article_category'
      });
      return ArticleCategory
}
