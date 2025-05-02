"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getSingleTodo = exports.getAllTodos = exports.createTodo = void 0;
const dbConnect_1 = require("../utils/dbConnect");
const validator_1 = require("validator");
const createTodo = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "name and email are required"
        });
    }
    if (!(0, validator_1.isEmail)(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Email Address"
        });
    }
    //Check if email already exists
    const checkEmailQuery = 'SELECT * FROM todos WHERE email = ?';
    dbConnect_1.db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // If email exists
        if (results.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            });
        }
        // Step 2: Insert new 
        const insertQuery = 'INSERT INTO todos (name, email) VALUES (?, ?)';
        dbConnect_1.db.query(insertQuery, [name, email], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                success: true,
                message: "Todo is created successfully",
                data: {
                    id: result.insertId,
                    name,
                    email
                }
            });
        });
    });
};
exports.createTodo = createTodo;
const getAllTodos = (req, res) => {
    const query = 'SELECT * FROM todos';
    dbConnect_1.db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({
            success: true,
            message: "Todos are retrieved successfully",
            data: result
        });
    });
};
exports.getAllTodos = getAllTodos;
//get-single-todo-by-id
const getSingleTodo = (req, res) => {
    const { id } = req.params;
    const selectQuery = 'SELECT * FROM todos WHERE id = ?';
    dbConnect_1.db.query(selectQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json({
            success: true,
            message: "Todo is retrieved successfully",
            data: results[0]
        });
    });
};
exports.getSingleTodo = getSingleTodo;
const updateTodo = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    //check email
    if (email) {
        const checkEmailExistuery = 'SELECT * FROM todos WHERE id != ? AND email =? ';
        dbConnect_1.db.query(checkEmailExistuery, [id, email], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length > 0) {
                return res.status(409).json({ message: 'This Email is already existed' });
            }
        });
    }
    let updateQuery;
    let updateData = [];
    if (name && email) {
        updateQuery = 'UPDATE todos SET name = ?, email = ? WHERE id = ?';
        updateData = [name, email, id];
    }
    if (name && !email) {
        updateQuery = 'UPDATE todos SET name = ? WHERE id = ?';
        updateData = [name, id];
    }
    if (email && !name) {
        updateQuery = 'UPDATE todos SET email = ? WHERE id = ?';
        updateData = [email, id];
    }
    dbConnect_1.db.query(updateQuery, updateData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({
            success: true,
            message: "Todo is updated successfully",
            data: result
        });
    });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => {
    const { id } = req.params;
    const deleteQuery = 'DELETE FROM todos WHERE id = ?';
    dbConnect_1.db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({
            success: true,
            message: "Todo is deleted successfully",
            data: result
        });
    });
};
exports.deleteTodo = deleteTodo;
