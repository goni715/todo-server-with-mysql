"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql_1 = __importDefault(require("mysql"));
const config_1 = __importDefault(require("../config"));
exports.db = mysql_1.default.createConnection({
    host: config_1.default.host,
    user: config_1.default.username, // Replace with your MySQL username
    password: config_1.default.password, // Replace with your MySQL password
    database: config_1.default.database, // Replace with your database name
});
const dbConnect = () => {
    exports.db.connect((err) => {
        if (err) {
            console.error("Error connecting to MySQL:", err);
            return;
        }
        console.log("Connected to MySQL database");
    });
};
exports.default = dbConnect;
