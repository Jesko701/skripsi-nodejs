const db = require("../model/db");

const authItemChild = db.Rbac_auth_item_child;
const authItem = db.Rbac_auth_item;

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
  const { parentOrChild } = req.params;
  try {
    const data = await authItemChild.findByPk(parentOrChild, {
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

const create = async (req, res) => {};

const update = async (req, res) => {};

const hapus = async (req, res) => {
  const { parentOrChild } = req.params;
  try {
    const data = await authItemChild.destroy({
      where: {
        [Op.or]: [{ parent: parentOrChild }, { child: parentOrChild }],
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
