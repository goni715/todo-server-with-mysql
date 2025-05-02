"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TodoController_1 = require("../controllers/TodoController");
const router = express_1.default.Router();
router.post('/create-todo', TodoController_1.createTodo);
router.get('/get-all-todos', TodoController_1.getAllTodos);
router.get('/get-single-todo/:id', TodoController_1.getSingleTodo);
router.patch('/update-todo/:id', TodoController_1.updateTodo);
router.delete('/delete-todo/:id', TodoController_1.deleteTodo);
exports.default = router;
