var express = require('express');
var router = express.Router();

var request = require('request');

var API_KEY = '58c39a23cd4e4dcb824927c34f075bf1';
var endpoint = 'https://newsapi.org/v1/articles';

router.get('/', function (req, res) {
    res.json(dummyJson);
});

router.get('/real', function (req, res) {
    request({
        uri: endpoint,
        qs: {
            source: 'techcrunch',
            apiKey: API_KEY
        }
    }, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred 
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        res.json(JSON.parse(body)); 
    });
});

var dummyJson = {
    "status": "ok",
    "source": "techcrunch",
    "sortBy": "top",
    "articles": [
        {
            "author": "Mike Butcher",
            "title": "What it’s like to drive a car while it’s being hacked",
            "description": "Ever been driving a car when both the brake and the gas pedal failed, and the dashboard go nuts? I just have, and it isn't fun. What are we going to do when..",
            "url": "https://techcrunch.com/2017/07/07/what-its-like-to-drive-a-car-while-its-being-hacked/",
            "urlToImage": "https://img.vidible.tv/prod/2017-07/07/595fb93592fdde6bcab05c25/595fb99ae9399f7778c57eef_o_U_v1.jpg?w=764&h=400",
            "publishedAt": "2017-07-07T17:46:35Z"
        },
        {
            "author": "Katie Roof",
            "title": "Amazon wasn’t the only company that tried to buy Whole Foods",
            "description": "A new filing confirms that there were other suitors trying to buy Whole Foods, but that Amazon put pressure on Whole Foods not to talk to them. The document..",
            "url": "https://techcrunch.com/2017/07/07/amazon-wasnt-the-only-company-that-tried-to-buy-whole-foods/",
            "urlToImage": "https://tctechcrunch2011.files.wordpress.com/2017/06/amazon-whole-foods-banner.jpg?w=764&h=400&crop=1",
            "publishedAt": "2017-07-07T21:50:44Z"
        },
        {
            "author": "Sarah Buhr",
            "title": "Comma.ai launches an $88 universal car interface called Panda",
            "description": "George Hotz is fidgeting in his living room, wearing dark shades and a giant comma on his t-shirt as he shows me his company's latest product, an $88..",
            "url": "https://techcrunch.com/2017/07/07/comma-ai-launches-an-88-universal-car-interface-called-panda/",
            "urlToImage": "https://img.vidible.tv/prod/2017-07/07/595ef480f3bdc95fde23abee/595ef4e9e9399f7778c57e97_o_U_v1.jpg?w=764&h=400",
            "publishedAt": "2017-07-07T13:00:15Z"
        },
        {
            "author": "Darrell Etherington",
            "title": "Tesla will build world’s largest battery storage facility for Australian wind farm",
            "description": "Tesla will up its game in the renewable energy storage market with the largest lithium-ion battery storage facility in the world, to be built for Australia's..",
            "url": "https://techcrunch.com/2017/07/07/tesla-will-build-worlds-largest-battery-storage-facility-for-australian-wind-farm/",
            "urlToImage": "https://tctechcrunch2011.files.wordpress.com/2017/07/dehi4jmuqaaa26t.jpg?w=764&h=400&crop=1",
            "publishedAt": "2017-07-07T12:23:43Z"
        },
        {
            "author": "Brian Heater",
            "title": "Jawbone is being liquidated as its CEO launches a related health startup",
            "description": "The slow and painful demise of Jawbone is finally coming to an end, as yet another effort to rejuvenate the business is beginning under a familiar name. After..",
            "url": "https://techcrunch.com/2017/07/06/jawbone-is-being-liquidated-as-its-ceo-launches-a-related-health-startup/",
            "urlToImage": "https://tctechcrunch2011.files.wordpress.com/2017/02/unspecified-1.png?w=764&h=400&crop=1",
            "publishedAt": "2017-07-06T23:01:28Z"
        }
    ]
};

module.exports = router;