const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

const startDate = new Date();
const data = require('./data/events.json');
const { getFormatedTime, isTypeCorrect, filterDataByType } = require('./app/functions');
const { allowTypes } = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }

    console.log(`Server is listening on ${port}`);
});

app.get('/status', (req, res) => {
    let currentDate = new Date();
    let timeDiff = currentDate - startDate;

    res.send(getFormatedTime(timeDiff));
});

app.get('/api/events', (req, res) => {
    if (req.query.type) {
        let type = req.query.type.split(':');
        if (!isTypeCorrect(type)) {
            res.status(400).send('incorrect type');
        } else if (type.length === allowTypes.length) {
            res.json(data);
        } else {
            res.json(filterDataByType(data, type));
        }
    } else {
        res.json(data);
    }
});

app.post('/api/events', (req, res) => {
    if(req.body.type) {
        let type = req.body.type.split(':');
        if (!isTypeCorrect(type)) {
            res.status(400).send('incorrect type');
        } else if (type.length === allowTypes.length) {
            res.json(data);
        } else {
            res.json(filterDataByType(data, type));
        }
    } else {
        res.json(data);
    }
});

app.get('/*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});
