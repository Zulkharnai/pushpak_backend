const { Model } = require('objection');
const { development } = require('@config');
const Knex = require('knex')(development);

const DBConnections = () => {
    Knex.raw('SELECT 1').then(() => {
        console.log("database connected!");
    }).catch((error) => {
        console.log(error);
    })
    Model.knex(Knex);
};

module.exports = DBConnections