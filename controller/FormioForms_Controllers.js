const db = require("../model/db");

const formioForms = db.Formio_forms;
const formioSubmission = db.Formio_submission;

const all = async (req, res) => {
  try {
    const data = await formioForms.findAll();
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
    const data = await formioForms.findByPk(id, {
      include: [
        {
          model: formioSubmission,
          as: "formio_submission",
        },
      ],
    });
    if (!data) {
      res.status(404).json({
        message: "data tidak ditemukan",
      });
    }
    res.status(201).json({
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
    const data = await formioForms.destroy({
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
  hapus,
};
