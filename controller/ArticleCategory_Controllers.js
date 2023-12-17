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

const dataPagination = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const jumlah = parseInt(req.query.jumlah) || 50;
    const offset = (page - 1) * jumlah;

    const data = await articleCategory.findAndCountAll({
      limit: jumlah,
      offset: offset,
      include: [{
        model: article,
        as: "article",
        limit: jumlah
      }]
    })
    res.status(200).json({
      message: "data berhasil ditemukan",
      data: data
    })
    
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
  const { slug, title, body, parent_id, status } = req.body;
  try {
    const data = await articleCategory.create({
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

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const { slug, title, body, parent_id, status } = req.body;
    const existingData = await articleCategory.findByPk(id);

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

    await existingData.save();

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

const hapus = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await articleCategory.destroy({
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
  dataPagination
};
