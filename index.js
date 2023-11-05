const db = require("./model/db");
const express = require("express");
const app = express();
const body = require('body-parser');

app.use(body.json());

db.sequelize
  .query("SET FOREIGN_KEY_CHECKS = 0")
  .then(() => {
    return db.sequelize.sync({ force: false });
  })
  .then(() => {
    console.log("Database telah berhasil dibuat");
    return db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  })
  .catch((err) => {
    console.error("Terjadi kesalahan dalam melakukan sinkronisasi", err);
    db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1").then(() => {
      console.log("Foreign Key telah diaktifkan kembali.");
    });
  });


const articleRoute = require("./routes/articleRoute");
app.use("/article", articleRoute);

const articleAttachment = require("./routes/articleAttachmentRoute")
app.use("/articleAtt", articleAttachment)

const articleCategory = require("./routes/articleCategoryRoute")
app.use("/articleCat", articleCategory)

const formioForms = require("./routes/formioFormsRoute")
app.use("/forms", formioForms)

const formioSubmission = require("./routes/formioSubmissionRoute")
app.use("/formsSubmission", formioSubmission)

const rbacAssignment = require("./routes/authAssignmentRoute")
app.use("/rbacAssign", rbacAssignment)

const rbacRule = require("./routes/authRuleRoute")
app.use("/rbacRule", rbacRule)

const rbacItem = require("./routes/authItemRoute")
app.use("/rbacItem", rbacItem)

const rbacChild = require("./routes/authChildRoute")
app.use("/rbacChild", rbacChild)

const fileSystem = require("./routes/fileSystemRoute")
app.use("/fileSystem",fileSystem)

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Berhasil mengambil API"
  });
});

app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});
