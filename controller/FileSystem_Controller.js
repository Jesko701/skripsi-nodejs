const db = require("../model/db");
const fileSystem = db.File_system;

const all = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const jumlah = parseInt(req.query.jumlah, 10) || 50; 

    const offset = (page - 1) * jumlah;

    const getData = await fileSystem.findAndCountAll({
      offset: offset,
      limit: jumlah
    });
    res.status(200).json({
      message: "data berhasil ditemukan",
      data: getData,
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
