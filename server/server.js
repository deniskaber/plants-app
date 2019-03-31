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

app.use('/plants', (req, res, next) => {
    connection.connect();

    connection.query(
        `SELECT ID, BOTANICAL_NAME, NAME, LIGHT, TEMPERATURE, HUMIDITY, WATERING, SOIL
        FROM plants.plants;`,
        (error, results, fields) => {
            if (error) throw error;

            res.json(results);
        },
    );

    connection.end();
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
