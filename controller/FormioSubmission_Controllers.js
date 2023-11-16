const connection = require("../db.config");
const db = require("../model/db");

const formsSubmission = db.Formio_submission;
const formsFormio = db.Formio_forms;

connection.connect();

const all = async (req, res) => {
  const page = req.query.page || 1;
  const itemsPerPage = 75;

  try {
    const sqlQuery = `
      SELECT *
      FROM formio_submissions
      LIMIT ${itemsPerPage} OFFSET ${(page - 1) * itemsPerPage};
    `;

    connection.query(sqlQuery, (error, result) => {
      if (error) {
        res.status(500).json({
          message: "Terjadi kesalahan saat mengambil data",
          error: error.message,
        });
      } else if (!result || result.length === 0) {
        res.status(404).json({
          message: "Data tidak ditemukan",
        });
      } else {
        res.status(200).json({
          message: "Berhasil mengambil data",
          data: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data",
      error: error.message,
    });
  }
};

const dataPagination = (req, res) => {
  try {
    const page = req.query.page || 1;
    const jumlah = req.query.jumlah || 50;
    const offset = (page - 1) * jumlah;

    const sqlQuery = `
      SELECT 
      fs.id as submissionId,
      fs.form_id as formId,
      fs.data as submissionData,
      fs.created_at as submissionCreatedAt,
      fs.updated_at as submissionUpdatedAt,
      fs.created_by as submissionCreatedBy,
      fs.updated_by as submissionUpdatedBy,
      fs.deleted as submissionDeletedBy,
      ff.*
      FROM formio_submissions fs
      LEFT JOIN formio_forms ff ON fs.form_id = ff.id
      LIMIT ${jumlah} OFFSET ${offset};
    `;

    connection.query(sqlQuery, (error, result) => {
      if (error) {
        res.status(500).json({
          message: "Terjadi kesalahan saat mengambil data",
          error: error.message,
        });
      } else if (!result || result.length === 0) {
        res.status(404).json({
          message: "Data tidak ditemukan",
        });
      } else {
        res.status(200).json({
          message: "Data berhasil ditemukan",
          data: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data",
      error: error.message,
    });
  }
};

const show = (req, res) => {
  const { id } = req.params;

  try {
    const sqlQuery = `SELECT 
    fs.id as submissionId,
    fs.form_id as formId,
    fs.data as submissionData,
    fs.created_at as submissionCreatedAt,
    fs.updated_at as submissionUpdatedAt,
    fs.created_by as submissionCreatedBy,
    fs.updated_by as submissionUpdatedBy,
    fs.deleted as submissionDeletedBy,
    ff.* FROM formio_submissions fs
    LEFT JOIN formio_forms ff ON fs.form_id = ff.id
    WHERE fs.id = ${id};
  `;
    connection.query(sqlQuery, (error, result) => {
      if (error) {
        res.status(500).json({
          message: "Terjadi kesalahan saat mengambil data",
          error: error.message,
        });
      } else if (!result || result.length === 0) {
        res.status(404).json({
          message: "Data tidak ditemukan",
        });
      } else {
        res.status(200).json({
          message: "Data berhasil ditemukan",
          data: result[0], // Ambil data pertama karena findByPk mengembalikan satu hasil
        });
      }
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
  dataPagination,
};
