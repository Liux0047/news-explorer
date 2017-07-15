var express = require('express');
var dataService = require('../services/data-service');
var router = express.Router();

router.get('/news-data', function (req, res) {
    dataService.collectNewsData();
    res.json();
});

module.exports = router;