"use strict";
exports.__esModule = true;
exports.db = void 0;
var db = function () { return ({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dbDevelopment: process.env.DB_NAME_DEVELOPMENT,
    dbProduction: process.env.DB_NAME_PRODUCTION,
    dialect: process.env.DB_DIALECT,
    synchronize: process.env.DB_SYNC === 'true'
}); };
exports.db = db;
