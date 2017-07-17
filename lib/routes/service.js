var express = require('express');
var newsCollector = require('../services/news-collector');
var router = express.Router();

router.get('/news-data', function (req, res) {
    newsCollector.getNewsData();
    res.json();
});

module.exports = router;