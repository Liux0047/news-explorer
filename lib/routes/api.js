var express = require('express');
var router = express.Router();
var analytics = require('../services/news-analytics');

var request = require('request');


router.get('/entity', function (req, res) {
    res.json(analytics.getEntity(req.query.topic, req.query.entity));
});

router.get('/topics', function (req, res) {
    res.json(analytics.getTopics());
});

router.get('/analytics', function (req, res) {
    res.json(analytics.getAnalytics());
});

module.exports = router;