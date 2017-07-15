var request = require('request');
var config = require('../app.config');
var dataService = {};

let _executionQueue = [];
let _wrapperFunc = function (fn, context, params) {
    return function () {
        fn.apply(context, params);
    };
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
            if (NLPResponse.ok) {
                article.analytics = NLPResponse.response;
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

dataService.collectNewsData = function () {
    getNewsData();

    setInterval(function () {
        if (_executionQueue.length > 0) {
            (_executionQueue.shift())();
        }
    }, 500);
};

module.exports = dataService;