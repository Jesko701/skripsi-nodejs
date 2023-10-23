const db = require("./model/db");
const express = require("express");
const app = express();

app.use(express.json());

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


// const articleRoute = require("./routes/articleRoute");
// app.use("/articleRoute", userRoutes);

// const articleCategory = require("./routes/articleCategoryRoute")
// app.use("/articleCategory", tutorialRoutes)

app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});
