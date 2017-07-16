const express = require('express');
var path = require('path');
var api = require('./lib/routes/api');
var service = require('./lib/routes/service');
const app = express();

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/api', api);
app.use('/service', service);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('Example app listening on port ' + app.get('port'));
});