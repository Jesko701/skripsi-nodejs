const connection = require("../db.config");
const db = require("../model/db");
const articleAttachment = db.ArticleAttachment;

connection.connect();

const all = (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM article_attachment";
    connection.query(sqlQuery, (error, result) => {
      if (error) {
        res.status(500).json({
          message: "Terdapat kesalahan dalam mengambil data",
          error: error.message
        })
      } else if (!result){
        res.status(404).json({
          message: "data tidak ditemukan",
        })
      }
      res.status(200).json({
        message: "data telah ditemukan",
        data: result
      });
    })
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
      SELECT
        at.*,
        a.title as article_title
      FROM
        article_attachment at
      LEFT JOIN
        article a
      ON
        at.article_id = a.id
      LIMIT ${jumlah} OFFSET ${offset};
    `;
    connection.query(sqlQuery, (error, result) => {
      if (error) {
        res.status(500).json({
          message: "Terdapat kesalahan dalam mengambil data",
          error: error.message
        })
      } else if (!result){
        res.status(404).json({
          message: "data tidak ditemukan",
        })
      }
      res.status(200).json({
        message: "data telah ditemukan",
        data: result
      });
    })
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
        at.id as attachment_id,
        at.article_id as attachment_articleId,
        at.path as attachment_path,
        at.base_url as attachment_baseUrl,
        at.type as attachment_type,
        at.size as attachment_size,
        at.name as attachment_name,
        at.order as attachment_order,
        a.*
      FROM
        article_attachment at
      LEFT JOIN
        article a
      ON
        at.article_id = a.id
      WHERE
      at.id = ${id};
    `;
    connection.query(sqlQuery, (error, result) => {
      if (error) {
        res.status(500).json({
          message: "Terdapat kesalahan dalam mengambil data",
          error: error.message
        })
      } else if (!result){
        res.status(404).json({
          message: "data tidak ditemukan",
        })
      }
      res.status(200).json({
        message: "data telah ditemukan",
        data: result
      });
    })
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data",
      error: error.message,
    });
  }
};

const create = (req, res) => {
  const { article_id, path, base_url, type, size, name, order } = req.body;
  try {
    const data = articleAttachment.create({
      article_id,
      path,
      base_url,
      type,
      size,
      name,
      order,
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
      message: "Terjadi kesalahan saat membuat data",
      error: error.message,
    });
  }
};

const update = (req, res) => {
  const id = req.params.id;
  try {
    const { article_id, path, base_url, type, size, name, order } = req.body;
    const existingData = articleAttachment.findByPk(id);
    if (!existingData) {
      return res.status(404).json({
        message: "data tidak ditemukan",
      });
    }
    existingData.article_id = article_id;
    existingData.path = path;
    existingData.base_url = base_url;
    existingData.type = type;
    existingData.size = size;
    existingData.name = name;
    existingData.order = order;

    existingData.save();
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

const hapus = (req, res) => {
  const { id } = req.params;
  try {
    const data = articleAttachment.destroy({
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
