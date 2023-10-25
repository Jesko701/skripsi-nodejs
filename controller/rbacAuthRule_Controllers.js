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
  const { name } = req.params;
  try {
    const data = await authRule.findByPk(name, {
      include: [
        {
          model: authItem,
          as: "auth_item",
        },
      ],
    });
    if (!data){
      return res.status(404).json({
        message: "data tidak ditemukan"
      })
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
