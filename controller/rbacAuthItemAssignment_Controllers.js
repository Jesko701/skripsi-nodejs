const db = require("../model/db");
const authItemAssignment = db.Rbac_auth_assignment;
const authItem = db.Rbac_auth_item;

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
const show = async (req, res) => {
  const { item_name } = req.params;
  try {
    const data = await authItemAssignment.findByPk(item_name, {
      include: [
        {
          model: authItem,
          as: "auth_item",
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

const create = async (req, res) => {};

const update = async (req, res) => {};

const hapus = async (req, res) => {
  const { item_name } = req.params;
  try {
    const data = await authItemAssignment.destroy({
      where: {
        item_name: item_name,
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
};
