require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.db_database,
  process.env.db_username,
  process.env.db_password,
  {
    host: process.env.db_host,
    dialect: process.env.db_dialect
  }
);

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

// * Article 
db.Article = require('./Article')(sequelize,Sequelize)
db.ArticleAttachment = require('./ArticleAttachment')(sequelize,Sequelize)
db.ArticleCategory = require('./ArticleCategory')(sequelize,Sequelize)
// * Form 
db.Formio_forms = require("./Formio_forms")(sequelize,Sequelize)
db.Formio_submission = require("./Formio_submission")(sequelize,Sequelize)
// * RBAC
db.Rbac_auth_rule = require("./Rbac_auth_rule")(sequelize, Sequelize)
db.Rbac_auth_item = require("./Rbac_auth_item")(sequelize, Sequelize)
db.Rbac_auth_item_child = require("./Rbac_auth_item_child")(sequelize, Sequelize)
db.Rbac_auth_assignment = require("./Rbac_auth_assignment")(sequelize, Sequelize)

// * Article Association (One To Many)
db.ArticleCategory.hasMany(db.Article, {
    as: "article",
    foreignKey: "category_id",
    onDelete: "CASCADE"
})
db.Article.belongsTo(db.ArticleCategory, {
    as : "article_category",
    foreignKey: "category_id"
})
db.Article.hasMany(db.ArticleAttachment, {
    as: "article_attachment",
    foreignKey: "article_id",
    onDelete: "CASCADE"
})
db.ArticleAttachment.belongsTo(db.Article, {
    as : "article",
    foreignKey: "article_id"
})

// * form Association (One To Many)
db.Formio_forms.hasMany(db.Formio_submission, {
    as: "formio_submission",
    foreignKey: "form_id",
    onDelete: "CASCADE"
})
db.Formio_submission.belongsTo(db.Formio_forms,{
    as: "formio_forms",
    foreignKey: "form_id"
})

//  * RBAC (One To Many)
db.Rbac_auth_rule.hasMany(db.Rbac_auth_item, {
    foreignKey:"rule_name",
    onDelete: "CASCADE"
})
db.Rbac_auth_item.belongsTo(db.Rbac_auth_rule, {
    as: "rbac_auth_rule",
    foreignKey: "rule_name"
})
db.Rbac_auth_item.hasMany(db.Rbac_auth_item_child, {
    foreignKey: 'parent',
    onDelete: "CASCADE"
})

db.Rbac_auth_item_child.belongsTo(db.Rbac_auth_item, {
    as: "to_rbac_auth_item",
    foreignKey: "parent",
    targetKey: "name"
})
db.Rbac_auth_item.hasMany(db.Rbac_auth_assignment, {
    foreignKey: "item_name",
    onDelete: "CASCADE"
})
db.Rbac_auth_assignment.belongsTo(db.Rbac_auth_item, {
    as: "to_rbac_auth_item",
    foreignKey: "item_name"
})

module.exports = db
