"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConnect_1 = __importDefault(require("./utils/dbConnect"));
const routes_1 = __importDefault(require("./routes/routes"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
// Parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Parse application/json
app.use(body_parser_1.default.json());
//database connection
(0, dbConnect_1.default)();
app.get('/', (req, res) => {
    res.send('Todo Server with mysql database is running...');
});
app.use('/api/v1/todo', routes_1.default);
app.use((req, res) => {
    res.status(404).json({
        sucess: false,
        data: "Route not found"
    });
});
exports.default = app;
