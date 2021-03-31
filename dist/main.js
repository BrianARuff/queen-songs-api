"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var middleware_1 = __importDefault(require("./middleware/middleware"));
var postgres_1 = __importDefault(require("./database/postgres"));
middleware_1.default.post("/songs", function (req, res) {
    var _a = req.body, title = _a.title, author = _a.author, lyrics = _a.lyrics, genre = _a.genre, album = _a.album;
    postgres_1.default.query("INSERT INTO songs (title, lyrics, author, genre, album) VALUES ($1, $2, $3, $4, $5) RETURNING *", [title, lyrics, author, genre, album], function (err, table) {
        if (err) {
            return res.json(err);
        }
        res.json(table.rows);
    });
});
middleware_1.default.get("/songs", function (req, res) {
    postgres_1.default.query("SELECT * FROM songs ORDER BY id ASC;", function (err, table) {
        if (err) {
            return res.json(err);
        }
        res.json(table.rows);
    });
});
middleware_1.default.listen((_a = process.env.LOCAL_PORT) !== null && _a !== void 0 ? _a : process.env.PORT, function () {
    var _a;
    console.log((_a = "Server running on port " + process.env.LOCAL_PORT) !== null && _a !== void 0 ? _a : process.env.PORT);
});
