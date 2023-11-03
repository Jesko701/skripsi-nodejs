const db = require("../model/db");

const formsSubmission = db.Formio_submission;
const formsFormio = db.Formio_forms;

const all = async (req, res) => {
  const page = req.query.page || 1; 
  const itemsPerPage = 75; 

  try {
    const data = await formsSubmission.findAndCountAll({
      limit: itemsPerPage, 
      offset: (page - 1) * itemsPerPage, 
    });

    const totalHalaman = Math.ceil(data.count / itemsPerPage);

    res.status(200).json({
      message: "berhasil mengambil data",
      data: data.rows,
      totalItems: data.count, 
      totalPages: totalHalaman, 
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
  const { form_id, data, created_by, updated_by, deleted } = req.body;
  try {
    const insert = await formsSubmission.create({
      form_id,
      data,
      created_by,
      updated_by,
      deleted,
    });
    if (!insert) {
      return res.status(404).json({
        message: "data tidak berhasil dibuat",
      });
    }
    res.status(200).json({
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
  const id = req.params.id;
  try {
    const { form_id, data, created_by, updated_by, deleted } = req.body;
    const existingData = await formsSubmission.findByPk(id);
    if (!existingData) {
      return res.status(404).json({
        message: "data tidak ditemukan",
      });
    }
    existingData.form_id = form_id;
    existingData.data = data;
    existingData.created_by = created_by;
    existingData.updated_by = updated_by;
    existingData.deleted = deleted;

    await existingData.save();
    res.status(200).json({
      message: "data berhasil diperbarui",
      data: existingData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui data",
      error: error.message,
    });
  }
};

const hapus = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await formsSubmission.destroy({
      where: {
        id: id,
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
