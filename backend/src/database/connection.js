const knex = require('knex');
const configuration = require('../../knexfile');
require('dotenv').config({ path: '.env.local' });

const config = configuration[process.env.NODE_ENV];

const connection = knex(config);

module.exports = connection;
