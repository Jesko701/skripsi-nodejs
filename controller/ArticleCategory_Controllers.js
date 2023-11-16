const connection = require("../db.config");
const db = require("../model/db");
const articleCategory = db.ArticleCategory;

const syncQuery = (sqlQuery, callback) => {
  db.sequelize
    .query(sqlQuery, { type: db.Sequelize.QueryTypes.SELECT })
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
};
connection.connect();

const all = (req, res) => {
  syncQuery("SELECT * FROM article_category", (error, data) => {
    if (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data",
        error: error.message,
      });
    }
    res.status(200).json({
      message: "berhasil mengambil seluruh data",
      data: data,
    });
  });
};

const dataPagination = (req, res) => {
  try {
    const page = req.query.page || 1;
    const jumlah = parseInt(req.query.jumlah) || 50;
    const offset = (page - 1) * jumlah;

    const sqlQuery = `
      SELECT 
      ac.id as category_id, 
      ac.slug as category_slug, 
      ac.title as category_title, 
      ac.body as category_body, 
      ac.parent_id as category_parent_id, 
      ac.status as category_status, 
      ac.created_at as category_createdAt, 
      ac.updated_at as category_updatedAt, 
      a.*
      FROM article_category ac
      RIGHT JOIN article a ON ac.id = a.id
      LIMIT ${jumlah}
      OFFSET ${offset}
    `;
    syncQuery(sqlQuery, (error, data) => {
      if (error) {
        return res.status(500).json({
          message: "Terjadi kesalahan saat mengambil data",
          error: error.message,
        });
      }
      res.status(200).json({
        message: "Data berhasil ditemukan",
        data: data,
      });
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
      ac.id as category_id, 
      ac.slug as category_slug, 
      ac.title as category_title, 
      ac.body as category_body, 
      ac.parent_id as category_parent_id, 
      ac.status as category_status, 
      ac.created_at as category_createdAt, 
      ac.updated_at as category_updatedAt, 
      a.*
      FROM article_category ac
      LEFT JOIN article a ON ac.id = a.category_id
      WHERE ac.id = ${id}
    `;

    syncQuery(sqlQuery, (error, data) => {
      if (error) {
        res.status(404).json({
          message: "data tidak ditemukan",
        });
      }
      res.status(200).json({
        message: "data berhasil ditemukan",
        data: data,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data",
      error: error.message,
    });
  }
};

const create = (req, res) => {
  const { slug, title, body, parent_id, status } = req.body;
  try {
    const data = articleCategory.create({
      slug,
      title,
      body,
      parent_id,
      status,
    });
    if (!data) {
      return res.status(404).json({
        message: "data tidak berhasil dibuat",
      });
    }
    res.status(200).json({
      message: "data berhasil dibuat",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "terjadi kesalahan saat menyimpan data",
      error: error.message,
    });
  }
};

const update = (req, res) => {
  const { id } = req.params;
  try {
    const { slug, title, body, parent_id, status } = req.body;
    const existingData = articleCategory.findByPk(id);

    if (!existingData) {
      return res.status(404).json({
        message: "data tidak ditemukan",
      });
    }

    existingData.slug = slug;
    existingData.title = title;
    existingData.body = body;
    existingData.parent_id = parent_id;
    existingData.status = status;

    existingData.save();

    res.status(200).json({
      message: "data berhasil diperbarui",
      data: existingData,
    });
  } catch (error) {
    res.status(500).json({
      message: "terjadi kesalahan saat merubah data",
      error: error.message,
    });
  }
};

const hapus = (req, res) => {
  const { id } = req.params;
  try {
    const data = articleCategory.destroy({
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
