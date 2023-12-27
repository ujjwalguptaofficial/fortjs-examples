// sequelize.js

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('test', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // Set to true to log SQL queries
});
