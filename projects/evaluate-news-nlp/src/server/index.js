const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const https = require('https');

const mockAPIResponse = require('./mockAPI.js')
const aylien = require("aylien_textapi");



const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

console.log(`Your API key is ${process.env.API_KEY}`);

const app = express()

app.use(express.static('dist'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.status(200).send(mockAPIResponse)
})

app.post('/sentiment', function (req, res) {

    textapi.sentiment({
        'text': req.body.input,
        'url': 'https://api.aylien.com/api/v1/classify',
        'language': 'en'
    }, function(error, response) {
        if (error === null) {
            console.log(response);
            res.status(200).send(response);
        } else {
            res.status(500).send({
                message: 'Something went wrong'
            })
        }
    });
})

app.post('/summarize', function (req, res) {
    console.log('request received');
    textapi.summarize({
        'url': req.body.input,
        'language': 'en',
        'sentences_number': 3
    }, function(error, response) {
        if (error === null) {
            console.log(response)
            //delete response.text;
            res.status(200).send(response);
        } else {
            console.log(error)
            res.status(500).send({
                message: error
            })
        }
    });
})
module.exports = app;
