import express from 'express';
import { createTodo, getAllTodos } from '../controllers/TodoController';

const router = express.Router();

router.post('/create-todo', createTodo)
router.get('/get-all-todos', getAllTodos);



export default router;