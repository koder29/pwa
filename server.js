const https = require('https');
const path = require('path');
const { readFileSync, readFile } = require('fs');

const express = require('express');
const morgan = require('morgan');

const app = express();
app.disable('ETag')
const served = new Map();
app.use(morgan('short'));
app.use(express.static(path.join(__dirname, '/dist/pwa'), {
    maxAge: 24 * 60 * 60 * 1000,
}));

app.get('*', (req, res) => {
    let buffer = readFileSync(path.join(__dirname, '/dist/pwa/index.html'));
    res.write(buffer);
    res.end();
})

const server = https.createServer({
    key: readFileSync('key.pem'),
    cert: readFileSync('cert.pem')
}, app);

server.listen(3000);