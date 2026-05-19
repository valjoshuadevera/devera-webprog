const express = require("express");
const {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controller/articleController");

const router = express.Router();

router.route("/").get(getArticles).post(createArticle);
router.get("/:slug", getArticleBySlug);
router.route("/:id").put(updateArticle).delete(deleteArticle);

module.exports = router;
