const connection = require("../db.config");
const db = require("../model/db");

const formioForms = db.Formio_forms;

connection.connect();

const all = async (req, res) => {
  try {
    const sqlQuery = `SELECT * FROM formio_forms`;
    connection.query(sqlQuery, (error, result) => {
      if (!result) {
        res.status(404).json({
          message: "data tidak ditemukan",
        });
      }
      res.status(200).json({
        message: "data berhasil ditemukan",
        data: result,
      });
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
    const jumlah = parseInt(req.query.jumlah, 10) || 50;
    const offset = (page - 1) * jumlah;

    const sqlQuery = `
      SELECT 
        ff.*,
        fs.id as submisson_id,
        fs.data as submisson_data,
        fs.created_at as submisson_createdAt,
        fs.updated_at as submisson_updatedAt,
        fs.created_by as submisson_createdBy,
        fs.updated_by as submisson_updatedBy,
        fs.deleted as submisson_deleted
      FROM formio_forms ff
      LEFT JOIN formio_submissions fs ON ff.id = fs.form_id
      LIMIT ${jumlah} OFFSET ${offset}
    `;
    connection.query(sqlQuery, (error, result) => {
      if (error) {
        res.status(500).json({
          message: "Terdapat kesalahan dalam mengambil data",
          error: error.message,
        });
      } else if (!result || result.length === 0) {
        res.status(404).json({
          message: "Data tidak ditemukan",
        });
      } else {
        res.status(200).json({
          message: "Data telah ditemukan",
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
    const sqlQuery = `
      SELECT 
        ff.*,
        fs.id as submission_id,
        fs.data as submission_data,
        fs.created_at as submission_createdAt,
        fs.updated_at as submission_updatedAt,
        fs.created_by as submission_createdBy,
        fs.updated_by as submission_updatedBy,
        fs.deleted as submission_deleted
      FROM formio_forms ff
      LEFT JOIN formio_submissions fs ON ff.id = fs.form_id 
      WHERE ff.id = ?;
    `;

    connection.query(sqlQuery, [id], (error, result) => {
      if (error) {
        res.status(500).json({
          message: "Terjadi kesalahan saat mengambil data",
          error: error.message,
        });
      } else if (result.length === 0) {
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


const create = async (req, res) => {
  const {
    status,
    name,
    token,
    data,
    created_by,
    updated_by,
    deleted,
    id_tema,
    is_only_kordes,
    is_only_dosen,
    is_harus_login,
  } = req.body;
  try {
    const insert = await formioForms.create({
      status,
      name,
      token,
      data,
      created_by,
      updated_by,
      deleted,
      id_tema,
      is_only_kordes,
      is_only_dosen,
      is_harus_login,
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
  const { id } = req.params;
  try {
    const {
      status,
      name,
      token,
      data,
      created_by,
      updated_by,
      deleted,
      id_tema,
      is_only_kordes,
      is_only_dosen,
      is_harus_login,
    } = req.body;
    const existingForms = await formioForms.findByPk(id);
    if (!existingForms) {
      return res.status(500).json({
        message: "data tidak ditemukan",
      });
    }
    existingForms.status = status;
    existingForms.name = name;
    existingForms.token = token;
    existingForms.data = data;
    existingForms.created_by = created_by;
    existingForms.updated_by = updated_by;
    existingForms.deleted = deleted;
    existingForms.id_tema = id_tema;
    existingForms.is_only_kordes = is_only_kordes;
    existingForms.is_only_dosen = is_only_dosen;
    existingForms.is_harus_login = is_harus_login;

    await existingForms.save();

    res.status(200).json({
      message: "data berhasil diperbarui",
      data: existingForms,
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
    const data = await formioForms.destroy({
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
