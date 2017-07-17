var request = require('request');
var config = require('../app.config');
var newsAnalytics = require('./news-analytics');
var newsCollector = {};

let _executionQueue = [];
let _wrapperFunc = function (fn, context, params) {
    return function () {
        fn.apply(context, params);
    };
};

var processNLP = function (analytics) {
    let processed = {
        topics: [],
        entities: []
    };
    if (analytics.coarseTopics && analytics.entities) {
        for (let topic of analytics.coarseTopics) {
            if (topic.score > 0.3) {
                processed.topics.push(topic.label);
            }
        }
        for (let entity of analytics.entities) {
            if (entity.confidenceScore > 2) {
                processed.entities.push(entity.entityId);
            }
        }
    }
    return processed;
};

// send to NLP API and store in Firebase
var storeNewsData = function (article, source, index) {
    request({   //send to NLP API
        uri: config.NLP_API_URL,
        method: 'POST',
        headers: {
            'x-textrazor-key': config.NLP_API_KEY,
            'Content-Type': 'application / x - www - form - urlencoded'
        },
        form: {
            'extractors': 'entities,topics',
            'text': article.title + '. ' + article.description
        }
    }, function (error, response, body) {
        if (response && response.statusCode === 200) {
            let url = config.FIREBASE_URL + 'news/' + source + '/' + index + '.json';
            let NLPResponse = JSON.parse(body);
            if (NLPResponse.ok && NLPResponse.response) {
                article.analytics = processNLP(NLPResponse.response);
                article.source = config.NEWS_SOURCES[source];
                request({
                    uri: url,
                    method: 'PUT',
                    body: JSON.stringify(article)
                });
                console.log('Storing news: ', article.title);
            }
        }
    });
};

// get news data from API and add to execution queue
var getNewsData = function () {
    for (let source in config.TEST_NEWS_SOURCES) {
        request({
            uri: config.NEWS_API_URL,
            qs: {
                source: source,
                apiKey: config.NEWS_API_KEY
            }
        }, function (error, response, body) {
            if (response && response.statusCode === 200) {
                let articles = JSON.parse(body).articles;
                for (let index in articles) {
                    // queue the NLP API call
                    _executionQueue.push(
                        _wrapperFunc(
                            storeNewsData, this, [articles[index], source, index]
                        )
                    );
                }
            }
        });
    }
};

newsCollector.collectNewsData = function () {
    getNewsData();

    var collector = setInterval(function () {
        if (_executionQueue.length > 0) {
            (_executionQueue.shift())();
        } else {
            console.log('All news collected');
            clearInterval(collector);
            setTimeout(newsAnalytics.retrieveNews, 1000 * 5);
        }
    }, 500);
};

// run the collector every day at 00:00 UTC
let target = new Date();
target.setUTCHours(0);
target.setUTCMinutes(0);
target.setUTCSeconds(0);
target.setUTCDate(target.getUTCDate() + 1);
setTimeout(function () {
    setInterval(newsCollector.collectNewsData, 24 * 60 * 60 * 1000);
}, target - new Date());

module.exports = newsCollector;