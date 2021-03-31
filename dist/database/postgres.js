"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var db = undefined;
if (process.env.NODE_ENV === "production") {
    db = new pg_1.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
else {
    db = new pg_1.Client({
        user: "postgres",
        host: "localhost",
        database: "songs",
        password: "123456",
        port: 5432
    });
}
db.connect();
exports.default = db;
