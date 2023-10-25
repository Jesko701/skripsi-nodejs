const db = require("../model/db");

const authItem = db.Rbac_auth_item;
const authItemChild = db.Rbac_auth_item_child;
const authAssignment = db.Rbac_auth_assignment;

const all = async (req, res) => {
  try {
    const data = await authItem.findAll();
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
    const data = await authItem.findByPk(name, {
      include: [
        {
          model: authItemChild,
          as: "auth_item_child",
        },
        {
          model: authAssignment,
          as: "auth_assignment",
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
  const { name } = req.params;
  try {
    const data = await authItem.destroy({
      where: {
        name: name,
      },
    });
    if (data > 0)
      return res.status(200).json({
        message: "data berhasil dihapus beserta relasinya",
      });
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
