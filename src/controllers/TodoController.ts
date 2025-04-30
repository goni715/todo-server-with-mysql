import { Request, Response } from "express";
import { db } from "../utils/dbConnect";


export const createTodo = (req: Request, res:Response) => {
    const { name, email} = req.body;

   // Step 1: Check if email already exists
  const checkEmailQuery = 'SELECT * FROM todos WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // If email exists, return an error
    if (results.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Step 2: Insert new 
    const insertQuery = 'INSERT INTO todos (name, email) VALUES (?, ?)';
    db.query(insertQuery, [name, email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, name, email});
    });
  });
}




export const getAllTodos = (req: Request, res:Response) => {
    const query = 'SELECT * FROM todos';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
    });
}


//get-single-todo-by-id
export const getSingleTodo = (req: Request, res:Response) => {
    const { id } = req.params;
    const selectQuery = 'SELECT * FROM todos WHERE id = ?';
    db.query(selectQuery, [id], (err, results) => {
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
}



export const updateTodo = (req: Request, res:Response) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const checkEmailExistuery = 'SELECT * FROM todos WHERE id != ? AND email =? ';

    db.query(checkEmailExistuery, [id, email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length>0) {
        return res.status(409).json({ message: 'This Email is already existed' });
      }

      //step-02
      const updateQuery = 'UPDATE todos SET name = ?, email = ? WHERE id = ?';

      db.query(updateQuery, [name, email, id], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ id: results.insertId, name, email});
      });

    });
}



export const deleteTodo = (req: Request, res:Response) => {
    const { id } = req.params;
    const deleteQuery = 'DELETE FROM todos WHERE id = ?';
    db.query(deleteQuery, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({
        success: true,
        message: "Todo is deleted successfully",
        data: results
      });
    });
}