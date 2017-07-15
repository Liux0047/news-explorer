var request = require('request');
var config = require('../app.config');
var model = require('../model');

var newsAnalytics = {};
var timestamp = new Date();

var analyze = function (news) {
    for (let source in news) {
        for (let newsItem of news[source]) {
            if (newsItem.analytics && newsItem.analytics.topics && newsItem.analytics.entities) {
                for (let topic of newsItem.analytics.topics) {
                    newsAnalytics[topic] = newsAnalytics[topic] || {};
                    for (let entity of new Set(newsItem.analytics.entities)) {
                        newsAnalytics[topic][entity] = newsAnalytics[topic][entity] || 0;
                        newsAnalytics[topic][entity]++;
                    }
                }
            }
        }
    }
    console.log(newsAnalytics);
};

// retrieve the news data
var retrieveNews = function () {
    request.get(
        config.FIREBASE_URL + 'news.json',
        function (error, response, body) {
            if (response && response.statusCode === 200) {
                model.news = JSON.parse(body);
                analyze(model.news);
            }
        });
};

retrieveNews();
module.exports = newsAnalytics;
