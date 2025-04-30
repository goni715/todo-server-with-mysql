import express from 'express';
import { createTodo, deleteTodo, getAllTodos, getSingleTodo, updateTodo } from '../controllers/TodoController';

const router = express.Router();

router.post('/create-todo', createTodo)
router.get('/get-all-todos', getAllTodos);
router.get('/get-single-todo/:id', getSingleTodo);
router.patch('/update-todo/:id', updateTodo);
router.delete('/delete-todo/:id', deleteTodo);



export default router;