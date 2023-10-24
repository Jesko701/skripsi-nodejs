const db = require("../model/db");

const formsSubmission = db.Formio_submission;
const formsFormio = db.Formio_forms;

const all = async (req, res) => {
  try {
    const data = await formsSubmission.findAll();
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
    const data = await formsSubmission.findByPk(id, {
      include: [
        {
          model: formsFormio,
          as: "formio_forms",
        },
      ],
    });
    if (!data) {
      res.status(404).json({
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
  const { id } = req.params;
  try {
    const data = await formsSubmission.destroy({
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
  hapus
}
