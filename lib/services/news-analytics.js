var request = require('request');
var config = require('../app.config');
var model = require('../model');

var newsAnalytics = {}, _analyticsData = {}, _hotTopics = [];
var timestamp = new Date();

var analyze = function (news) {
    _analyticsData = {};
    _hotTopics = [];
    for (let source in news) {
        for (let newsItem of news[source]) {
            if (newsItem && newsItem.analytics && newsItem.analytics.topics && newsItem.analytics.entities) {
                for (let topic of newsItem.analytics.topics) {
                    _analyticsData[topic] = _analyticsData[topic] || {};
                    for (let entity of new Set(newsItem.analytics.entities)) {
                        _analyticsData[topic][entity] = _analyticsData[topic][entity] || {
                            entity: entity,
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

    for (let topic in _analyticsData) {
        // sort the entities by count
        let entities = Object.keys(_analyticsData[topic]).map(k => _analyticsData[topic][k])
            .sort((a, b) => b.count - a.count).slice(0, 8);
        _hotTopics.push({
            topic: topic,
            entities: entities.filter(e => e.newsList.length > 2).map(e => {
                return {
                    entity: e.entity,
                    count: e.newsList.length
                };
            }),
        });
    }
    _hotTopics = _hotTopics.filter(t => t.entities.length > 0)
        .sort((a, b) => b.entities[0].count - a.entities[0].count);

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

newsAnalytics.getTopics = function () {
    return _hotTopics.slice(0, 6);
};

newsAnalytics.getEntity = function (topic, entity) {
    return _analyticsData[topic][entity];
};

newsAnalytics.getAnalytics = function () {
    return _analyticsData;
};

newsAnalytics.retrieveNews();

module.exports = newsAnalytics;
