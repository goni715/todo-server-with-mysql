import { Request, Response } from "express";
import { db } from "../utils/dbConnect";


export const createTodo = (req: Request, res:Response) => {
    const { name, email} = req.body;
    const query = 'INSERT INTO todos (name, email) VALUES (?, ?) ';
    db.query(query, [name, email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json(results);
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