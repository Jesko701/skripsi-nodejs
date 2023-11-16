const db = require("../model/db");
const { Op } = require("sequelize");
const authItemChild = db.Rbac_auth_item_child;
const authItem = db.Rbac_auth_item;

const syncQuery = (sqlQuery, callback) => {
  db.sequelize
    .query(sqlQuery, { type: db.Sequelize.QueryTypes.SELECT })
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
};

const all = async (req, res) => {
  try {
    const data = await authItemChild.findAll();
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
  const { parent } = req.params;
  try {
    const data = await authItemChild.findByPk(parent, {
      include: [
        {
          model: authItem,
          as: "auth_item",
        },
      ],
    });
    if (!data) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
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
  const { parent, child } = req.body;
  try {
    const insert = await authItemChild.create({
      parent,
      child,
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
    res.status(500).json({
      message: "Terjadi kesalahan saat membuat data",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  const { parent } = req.params;
  try {
    const { child } = req.body;
    const existingData = await authItemChild.update(child, {
      where: {
        parent: parent
      },
      returning: true
    });
    if (existingData[0] === 0) {
      res.status(404).json({
        message: "data tidak ditemukan",
      });
    }
    res.status(200).json({
      message: "data berhasil diperbarui",
      data: existingData[1][0]
    })
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui data",
      error: error.message,
    });
  }
};

const hapus = async (req, res) => {
  const { parent } = req.params;
  try {
    const data = await authItemChild.destroy({
      where: {
        parent: parent,
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
