import express from 'express';
import { createTodo, getAllTodos, getSingleTodo, updateTodo } from '../controllers/TodoController';

const router = express.Router();

router.post('/create-todo', createTodo)
router.get('/get-all-todos', getAllTodos);
router.get('/get-single-todo/:id', getSingleTodo);
router.put('/update-todo/:id', updateTodo);



export default router;