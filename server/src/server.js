require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./apiRouterMiddleware');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/', (req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
    });

    next();
});

app.use('/api', apiRouter);

app.use('/static', express.static('public'));

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
