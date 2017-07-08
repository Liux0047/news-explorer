const express = require('express');
var path = require('path');
var api = require('./server/routes/api');
const app = express();

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/api', api);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});