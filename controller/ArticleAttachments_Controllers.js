const db = require("../model/db");
const articleAttachment = db.ArticleAttachment;
const article = db.article;

const all = async (req, res) => {
  try {
    const data = await articleAttachment.findAll();
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
    const data = await articleAttachment.findByPk(id, {
      include: [
        {
          model: article,
          as: "article",
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

const create = async (req, res) => {
  const { article_id, path, base_url, type, size, name, order } = req.body;
  try {
    const data = await articleAttachment.create({
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

const update = async (req, res) => {
  const id = req.params.id;
  try {
    const { article_id, path, base_url, type, size, name, order } = req.body;
    const existingData = await articleAttachment.findByPk(id);
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
      error: error.message
    })
  }
};

const hapus = async (req, res) => {
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
};
