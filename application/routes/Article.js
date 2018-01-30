var express = require('express');
var router = express.Router();

var Article = require('../controller/Article')


router.get(/^\/(index|list)?$/, Article.list);
router.get("/detail", Article.detail);
router.route("/add").get(Article.add.get).post(Article.add.post);
router.route("/edit").get(Article.edit.get).post(Article.edit.post);
router.post("/delete", Article.delete);


module.exports = router;
