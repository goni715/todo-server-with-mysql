import express from 'express';
import { createTodo, getAllTodos, getSingleTodo } from '../controllers/TodoController';

const router = express.Router();

router.post('/create-todo', createTodo)
router.get('/get-all-todos', getAllTodos);
router.get('/get-single-todo/:id', getSingleTodo);



export default router;