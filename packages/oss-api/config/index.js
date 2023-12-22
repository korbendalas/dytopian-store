"use strict";
exports.__esModule = true;
exports.config = void 0;
var db_1 = require("./db");
var config = function () { return ({
    port: parseInt(process.env.PORT, 10) || 4000,
    jwtSecret: process.env.JWT_SECRET,
    productKey: process.env.PRODUCT_KEY_SECRET,
    db: (0, db_1.db)()
}); };
exports.config = config;
