const apiRouter = require('express').Router();
const plantsController = require('./controllers/plants.controller');

apiRouter.use('/plants/popular', (req, res, next) => {
    return plantsController.getPopularPlantsList().then((results) => {
        res.json(results);
    });
});

apiRouter.use('/plants', (req, res, next) => {
    return plantsController.getPlantsDictionary().then((results) => {
        res.json(results);
    });
});

module.exports = apiRouter;
