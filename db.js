'use strict';

const Sequelize = require('sequelize');

let DB_URL = "postgresql://postgres:post@localhost:5432/postgres";

const dbInstance = new Sequelize(DB_URL,
    {
        pool: {
            max: 100,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
const Op = Sequelize.Op;

const extractedFields = require('./models/student')(dbInstance, Sequelize);
module.exports = {
    dbInstance,
    Op,
    extractedFields
}