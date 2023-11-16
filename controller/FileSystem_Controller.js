const connection = require("../db.config");
const db = require("../model/db");
const fileSystem = db.File_system;
connection.connect();

const all = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const jumlah = parseInt(req.query.jumlah, 10) || 50;

    const offset = (page - 1) * jumlah;

    const sqlQuery = `SELECT * FROM file_storage_item LIMIT ${jumlah} OFFSET ${offset}`;
    connection.query(sqlQuery, (error, result) => {
      if (error) {
        res.status(500).json({
          message: "Terjadi kesalahan dalam mengambil data",
        });
      } else if (!result) {
        res.status(404).json({
          message: "data tidak ditemukan",
        });
      }
      res.status(200).json({
        message: "data telah ditemukan",
        data: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data",
      error: error.message,
    });
  }
};

module.exports = {
  all,
};
