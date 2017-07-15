var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/', function (req, res) {
    res.json(dummyJson);
});

router.get('/:source', function (req, res) {
    request({
        uri: config.NEWS_API_URL,
        qs: {
            source: req.params.source,
            apiKey: config.NEWS_API_KEY
        }
    }, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred 
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        res.json(JSON.parse(body)); 
    });
});

module.exports = router;