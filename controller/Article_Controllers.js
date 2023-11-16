const db = require("../model/db");

const article = db.Article;
const connection = require("../db.config");

const syncQuery = (sqlQuery, callback) => {
  db.sequelize
    .query(sqlQuery, { type: db.Sequelize.QueryTypes.SELECT })
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
};
connection.connect();
const all = (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM article";
    syncQuery(sqlQuery, (error, data) => {
      if (error) {
        res.status(500).json({
          message: "Terjadi kesalahan saat mengambil data",
          error: error.message,
        });
      } else {
        res.status(200).json({
          message: "Berhasil mengambil seluruh data",
          data: data,
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
    const jumlah = parseInt(req.query.jumlah) || 50;
    const offset = (page - 1) * jumlah;

    const sqlQuery = `
    SELECT a.id AS article_id, 
    a.title AS article_title,
    a.body as article_body,
    a.view as  article_view,
    a.thumbnail_base_url as article_baseUrl,
    a.thumbnail_path as article_path,
    a.status as article_status,
    at.id AS attachment_id,
    at.article_id AS attachment_id,
    ac.id AS category_id,
    ac.title AS category_name
    FROM article a
      LEFT JOIN
        article_attachment at
      ON
        a.id = at.article_id
      LEFT JOIN
        article_category ac
      ON
        a.category_id = ac.id
      LIMIT ${jumlah} OFFSET ${offset};
    `;

    syncQuery(sqlQuery, (error, data) => {
      if (error) {
        res.status(500).json({
          message: "Terjadi kesalahan saat mengambil data",
          error: error.message,
        });
      } else {
        res.status(200).json({
          message: "Data berhasil ditemukan",
          data: data,
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
    // Tidak perlu melakukan connection.connect() dua kali
    const sqlQuery = `
    SELECT article.id AS article_id, 
    article.title AS article_title,
    article.body as article_body,
    article.view as  article_view,
    article.thumbnail_base_url as article_baseUrl,
    article.thumbnail_path as article_path,
    article.status as article_status,
    article_attachment.id AS attachment_id,
    article_attachment.article_id AS attachment_id,
    article_category.id AS category_id,
    article_category.title AS category_name
    FROM article 
    LEFT JOIN article_attachment ON article.id = article_attachment.article_id
    LEFT JOIN article_category ON article.category_id = article_category.id
    WHERE article.id = ${id};
    `;
    syncQuery(sqlQuery, (error,result) => {
      if (error) {
        res.status(404).json({
          message: "data tidak ditemukan",
          error: error.message
        })
      }
      res.status(200).json({
        message: "data ditemukan",
        data: result
      })
    })
    // connection.query(sqlQuery, [id], (error, result) => {
    //   if (error) {
    //     res.status(500).json({
    //       message: "Terjadi kesalahan saat mengambil data",
    //       error: error.message,
    //     });
    //   } else if (result.length === 0) {
    //     res.status(404).json({
    //       message: "Data tidak ditemukan",
    //     });
    //   } else {
    //     res.status(200).json({
    //       message: "Data berhasil ditemukan",
    //       data: result,
    //     });
    //   }
    // });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data",
      error: error.message,
    });
  }
};

const create = (req, res) => {
  const {
    slug,
    title,
    body,
    view,
    category_id,
    thumbnail_base_url,
    thumbnail_path,
    status,
    created_by,
    updated_by,
    published_at,
  } = req.body;
  try {
    const newArticle = article.create({
      slug,
      title,
      body,
      view,
      category_id,
      thumbnail_base_url,
      thumbnail_path,
      status,
      created_by,
      updated_by,
      published_at,
    });
    if (!newArticle) {
      return res.status(404).json({
        message: "data tidak berhasil dibuat",
      });
    }
    res.status(201).json({
      message: "data berhasil dibuat",
      data: newArticle,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat membuat data",
      error: error.message,
    });
  }
};

const update = (req, res) => {
  const id = req.params.id;
  try {
    const {
      slug,
      title,
      body,
      view,
      category_id,
      thumbnail_base_url,
      thumbnail_path,
      status,
      created_by,
      updated_by,
      published_at,
    } = req.body;

    const existingData = article.findByPk(id);
    if (!existingData) {
      return res.status(404).json({
        message: "data tidak ditemukan",
      });
    }

    existingData.slug = slug;
    existingData.title = title;
    existingData.body = body;
    existingData.view = view;
    existingData.category_id = category_id;
    existingData.thumbnail_base_url = thumbnail_base_url;
    existingData.thumbnail_path = thumbnail_path;
    existingData.status = status;
    existingData.created_by = created_by;
    existingData.updated_by = updated_by;
    existingData.published_at = published_at;

    existingData.save();

    res.status(200).json({
      message: "data berhasil diperbarui",
      data: existingData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengupdate data",
      error: error.message,
    });
  }
};

const hapus = (req, res) => {
  const { id } = req.params;
  try {
    const hapus = article.destroy({
      where: {
        id: id,
      },
    });
    if (!hapus) {
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
