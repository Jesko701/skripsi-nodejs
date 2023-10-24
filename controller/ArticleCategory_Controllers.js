const db = require("../model/db");
const articleCategory = db.ArticleCategory;
const article = db.Article;

const all = async (req, res) => {
  try {
    const data = await articleCategory.findAll();
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
    const data = await articleCategory.findByPk(id, {
      include: [
        {
          model: article,
          as: "article",
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
    const data = await articleCategory.destroy({
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
