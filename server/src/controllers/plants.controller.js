const {connectionPool} = require('../db/dbConnect');

const plantsController = {
    getPlantsDictionary() {
        return connectionPool
            .query(
                `SELECT ID, BOTANICAL_NAME, NAME, LIGHT, TEMPERATURE, HUMIDITY, WATERING, SOIL
                FROM plants.plants;`,
            )
            .then((results) => {
                return results.map((row) => ({
                    id: row.ID,
                    botanicalName: row.BOTANICAL_NAME,
                    name: row.NAME,
                    light: row.LIGHT,
                    temperature: row.TEMPERATURE,
                    humidity: row.HUMIDITY,
                    watering: row.WATERING,
                    soil: row.SOIL,
                }));
            });
    },

    getPopularPlantsList() {
        return connectionPool.query(`SELECT id, name, botanical_name FROM plants.v_popular_plants;`).then((results) => {
            return results.map((row) => ({
                id: row.id,
                botanicalName: row.botanical_name,
                name: row.name,
            }));
        });
    },
};

module.exports = plantsController;
