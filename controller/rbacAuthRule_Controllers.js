const db = require("../model/db");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const authRule = db.Rbac_auth_rule;
const authItem = db.Rbac_auth_item;

const syncQuery = (sqlQuery, callback) => {
  db.sequelize
    .query(sqlQuery, { type: db.Sequelize.QueryTypes.SELECT })
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
};

const all = async (req, res) => {
  try {
    const data = await authRule.findAll();
    res.status(200).json({
      message: "berhasil mengambil seluruh data",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data",
      error: error.message,
    });
  }
};

const show = async (req, res) => {
  const { name } = req.params;
  try {
    const data = await authRule.findByPk(name, {
      include: [
        {
          model: authItem,
          as: "rbac_auth_items",
        },
      ],
    });
    if (!data) {
      return res.status(404).json({
        message: "data tidak ditemukan",
      });
    }
    res.status(200).json({
      message: "data berhasil ditemukan",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data",
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  upload.single("data")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).json({
        message: "Terdapat kesalahan dalam mengunggah file",
        error: err.message,
      });
    } else if (err) {
      res.status(500).json({
        message: "Terdapat kesalahan dalam mengunggah file",
        error: err.message,
      });
    } else {
      try {
        const { name } = req.body;
        const { data } = req.file;
        const insert = await authRule.create({
          name: name,
          data: data,
        });
        if (!insert) {
          res.status(404).json({
            message: "data gagal dibuat",
          });
        }
        res.status(201).json({
          message: "data berhasil ditambahkan",
          data: insert,
        });
      } catch (error) {
        console.log(req.body);
        res.status(500).json({
          message: "Terjadi kesalahan saat membuat data",
          error: error.message,
        });
      }
    }
  });
};

const update = async (req, res) => {
  const { name } = req.params;
  try {
    const existingRule = await authRule.findByPk(name);
    if (!existingRule) {
      res.status(404).json({
        message: "data tidak ditemukan",
      });
    } else {
      upload.single('data')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          res.status(400).json({
            message: 'Terjadi kesalahan saat mengunggah file',
            error: err.message,
          });
        } else if (err) {
          res.status(500).json({
            message: 'Terjadi kesalahan saat mengunggah file',
            error: err.message,
          });
        } else {
          if (req.file) {
            const { data } = req.file; 
            existingRule.data = data; 
          }

          await existingRule.save();

          res.status(200).json({
            message: "data berhasil diperbarui",
            data: existingRule,
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengupdate data",
      error: error.message,
    });
  }
};

const hapus = async (req, res) => {
  const { name } = req.params;
  try {
    const data = await authRule.destroy({
      where: {
        name: name,
      },
    });
    if (!data) {
      return res.status(404).json({
        message: "data tidak ditemukan",
      });
    }
    res.status(200).json({
      message: "data berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat menghapus data",
      error: error.message,
    });
  }
};

module.exports = {
  all,
  show,
  create,
  update,
  hapus,
};
