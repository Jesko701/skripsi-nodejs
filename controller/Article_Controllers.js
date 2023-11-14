const db = require("../model/db");

const article = db.Article;
const articleAttachment = db.ArticleAttachment;
const articleCategory = db.ArticleCategory;

const all = (req, res) => {
  try {
    const data = article.findAll();
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

const dataPagination = (req, res) => {
  try {
    const page = req.query.page || 1;
    const jumlah = parseInt(req.query.jumlah) || 50;
    const offset = (page - 1) * jumlah;

    const data = article.findAndCountAll({
      limit: jumlah,
      offset: offset,
      include: [
        {
          model: articleAttachment,
          as: "article_attachment",
          limit: jumlah,
        },
        {
          model: articleCategory,
          as: "article_category",
        },
      ],
    });
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

const show = (req, res) => {
  const { id } = req.params;
  try {
    const data = article.findByPk(id, {
      include: [
        {
          model: articleAttachment,
          as: "article_attachment",
        },
        {
          model: articleCategory,
          as: "article_category",
        },
      ],
    });
    if (!data) {
      return res.status(404).json({
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
