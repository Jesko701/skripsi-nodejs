const db = require("../model/db");

const article = db.article;
const articleAttachment = db.ArticleAttachment;
const articleCategory = db.ArticleCategory;

const createArticle = async (req, res) => {};

const all = async (req, res) => {
  try {
    const data = await article.findAll();
    res.status(200).json({
        message: 'berhasil mengambil seluruh data',
        data: data
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data",
      error: error.message,
    });
  }
};

const show = async(req,res) => {
    const {id} = req.params;
    try {
        const data = await article.findByPk(id, {
          include: [{
            model: articleAttachment,
            as: "article_attachment"
          }, {
            model: articleCategory,
            as: "article_category"
          }]
        })
        if (!data) {
          res.status(404).json({
            message: "data tidak ditemukan"
          })
        }
        res.status(201).json({
          message: 'data berhasil ditemukan',
          data: data
      });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan saat mengambil data",
            error: error.message,
          });
    }
}

const create = async(req,res) => {
   
}

const update = async(req,res) => {

}

const hapus = async(req,res) => {
  const {id} = req.params;
  try {
    const hapus = await article.destroy({
      where: {
        id: id
      }
    })
    if (!hapus) {
      res.status(404).json({
        message:"data tidak ditemukan"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat menghapus data",
      error: error.message,
    });
  }
}

module.exports = {
    all,
    show,
    create,
    update,
    hapus
}
