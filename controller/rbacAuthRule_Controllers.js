const db = require("../model/db");

const authRule = db.Rbac_auth_rule;
const authItem = db.Rbac_auth_item;

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
  const { id } = req.params;
  try {
    const data = await authRule.findByPk(id, {
      include: [
        {
          model: authItem,
          as: "auth_item",
        },
      ],
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

const create = async (req, res) => {};

const update = async (req, res) => {};

const hapus = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await authRule.destroy({
      where: {
        id: id,
      },
    });
    if (!data) {
      res.status(404).json({
        message: "data tidak ditemukan",
      });
    }
    res.status(200).json({
      message: "data berhasil dihapus",
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
  show,
  create,
  update,
  hapus,
};
