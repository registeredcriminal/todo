const { Sequelize } = require('sequelize');

// Default environment is 'development'
const env = process.env.NODE_ENV || 'development';

// Load the configuration
const config = require("../config.js");

const sequelize = new Sequelize(
    config[env].dsn,
    {
        dialect: config[env].dialect,        
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
        },
        logging: console.log,
    });

const db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
};

db.todos = require("./todos.js")(sequelize, Sequelize);

module.exports = db;