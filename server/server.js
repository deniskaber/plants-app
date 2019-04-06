require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session');
// const RedisStore = require('connect-redis')(session);

const app = express();
const port = 3000;

app.use(bodyParser.json());
// app.use(session({
//     store: new RedisStore({
//         url: config.redisStore.url
//     }),
//     secret: config.redisStore.secret,
//     resave: false,
//     saveUninitialized: false,
// }));
// app.use(passport.initialize());
// app.use(passport.session());

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect();

app.use('/', (req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
    });

    next();
});

app.use('/plants', (req, res, next) => {

    connection.query(
        `SELECT ID, BOTANICAL_NAME, NAME, LIGHT, TEMPERATURE, HUMIDITY, WATERING, SOIL
        FROM plants.plants;`,
        (error, results, fields) => {
            if (error) {
                // connection.end();
                throw error;
            }

            const mappedResults = results.map((row) => ({
                id: row.ID,
                botanicalName: row.BOTANICAL_NAME,
                name: row.NAME,
                light: row.LIGHT,
                temperature: row.TEMPERATURE,
                humidity: row.HUMIDITY,
                watering: row.WATERING,
                soil: row.SOIL,
            }));

            res.json(mappedResults);

            // connection.end();
        },
    );
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
