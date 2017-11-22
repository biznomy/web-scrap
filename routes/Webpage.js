var express = require('express');
var router = express.Router();
var WebpageController = require('../controllers/WebpageController.js');

router.get('/', WebpageController.list);

router.get('/:id', WebpageController.show);

router.post('/', WebpageController.create);

router.put('/:id', WebpageController.update);

router.delete('/:id', WebpageController.remove);

module.exports = router;
