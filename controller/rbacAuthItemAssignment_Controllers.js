const db = require("../model/db");
const authItemAssignment = db.Rbac_auth_assignment;
const authItem = db.Rbac_auth_item;

const syncQuery = (sqlQuery, callback) => {
  db.sequelize
    .query(sqlQuery, { type: db.Sequelize.QueryTypes.SELECT })
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
};

const all = async (req, res) => {
  try {
    const data = await authItemAssignment.findAll();
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

const dataPagination = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const jumlah = parseInt(req.query.jumlah) || 50;
    const offset = (page - 1) * jumlah;
    const data = await authItemAssignment.findAndCountAll({
      offset: offset,
      limit: jumlah,
      include: [{ model: authItem, as: "to_rbac_auth_item" }],
    });
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

const show = async (req, res) => {
  const { user_id } = req.params;
  try {
    const data = await authItemAssignment.findByPk(user_id, {
      include: [
        {
          model: authItem,
          as: "to_rbac_auth_item",
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
  try {
    const { item_name, user_id } = req.body;
    const insert = await authItemAssignment.create({ item_name, user_id });
    if (!insert) {
      res.status(404).json({
        message: "data gagal dibuat",
      });
    }
    res.status(201).json({
      message: "data berhasil dibuat",
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
  const user_id = req.params.user_id;
  try {
    const { item_name } = req.body;
    const existingAuthAssignment = await authItemAssignment.findByPk(user_id);
    if (!existingAuthAssignment) {
      res.status(404).json({
        message: "data tidak ditemukan",
      });
    }
    existingAuthAssignment.item_name = item_name;
    await existingAuthAssignment.save();
    res.status(200).json({
      message: "data berhasil diperbarui",
      data: existingAuthAssignment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengupdate data",
      error: error.message,
    });
  }
};

const hapus = async (req, res) => {
  const { user_id } = req.params;
  try {
    const data = await authItemAssignment.destroy({
      where: {
        user_id: user_id,
      },
    });
    if (data > 0) {
      return res.status(200).json({
        message: "data berhasil dihapus",
      });
    }
    res.status(404).json({
      message: "data tidak ditemukan",
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
  dataPagination
};
