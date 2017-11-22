var schedular = require("../utils/SchedularUtil");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  schedular.scrap();
  res.render('index', { title: 'Web Scrap' });
});





module.exports = router;