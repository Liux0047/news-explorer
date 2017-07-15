var request = require('request');
var config = require('../app.config');
var model = require('../model');

var newsAnalytics = {}, _analyticsData = {};
var timestamp = new Date();

var analyze = function (news) {
    for (let source in news) {
        for (let newsItem of news[source]) {
            if (newsItem.analytics && newsItem.analytics.topics && newsItem.analytics.entities) {
                for (let topic of newsItem.analytics.topics) {
                    _analyticsData[topic] = _analyticsData[topic] || {};
                    for (let entity of new Set(newsItem.analytics.entities)) {
                        _analyticsData[topic][entity] = _analyticsData[topic][entity] || {
                            count: 0,
                            newsList: []
                        };
                        _analyticsData[topic][entity].count++;
                        _analyticsData[topic][entity].newsList.push(newsItem);
                    }
                }
            }
        }
    }
    console.log('News analysis completed');
};

// retrieve the news data
newsAnalytics.retrieveNews = function () {
    console.log('Retrieving news from Firebase...');
    request.get(
        config.FIREBASE_URL + 'news.json',
        function (error, response, body) {
            if (response && response.statusCode === 200) {
                model.news = JSON.parse(body);
                analyze(model.news);
            }
        });
};

newsAnalytics.getEntities = function (topic) {
    let res = [];
    if (_analyticsData[topic]) {
        for (let entity in _analyticsData[topic]) {
            res.push({
                entity: entity,
                count: _analyticsData[topic][entity].count,
                newsList: _analyticsData[topic][entity].newsList
            });
        }
    }
    return res.sort((a, b) => b.count - a.count);
};

newsAnalytics.getTopics = function () {
    return Object.keys(_analyticsData);
};

newsAnalytics.retrieveNews();

module.exports = newsAnalytics;
