const https = require('https');
const path = require('path');
const { readFileSync, readFile } = require('fs');

const express = require('express');
const morgan = require('morgan');

const app = express();
app.disable('ETag')
const served = new Map();
app.use(morgan('short'));


app.get('/ngsw.json', (req, res)=>{
    console.log("Reqquest for SW");
    const sw = readFileSync('/home/mathstracted/projects/fe/ng/pwa-test/pwa/dist/pwa/ngsw.json');
    res.end(sw.toString(), ()=>res.end());
})


app.use(express.static(path.join(__dirname, '/dist/pwa'), {
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