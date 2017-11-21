var httpUtil = require("../HttpUtil");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
httpUtil.get('http://technolabs.in')
  res.render('index', { title: 'Express' });
});

module.exports = router;
