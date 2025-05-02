import { Request, Response } from "express";
import { db } from "../utils/dbConnect";
import { isEmail } from "validator";

export const createTodo = (req: Request, res: Response): any => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "name and email are required",
    });
  }

  if (!isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Email Address",
    });
  }

  //Check if email already exists
  const checkEmailQuery = "SELECT * FROM todos WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    // If email exists
    if (results.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Step 2: Insert new
    const insertQuery = "INSERT INTO todos (name, email) VALUES (?, ?)";
    db.query(insertQuery, [name, email], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }
      res.status(201).json({
        success: true,
        message: "Todo is created successfully",
        data: {
          id: result.insertId,
          name,
          email,
        },
      });
    });
  });
};

export const getAllTodos = (req: Request, res: Response) => {
  const query = "SELECT * FROM todos ORDER BY id DESC";
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
    res.status(200).json({
      success: true,
      message: "Todos are retrieved successfully",
      data: result,
    });
  });
};

//get-single-todo-by-id
export const getSingleTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const selectQuery = "SELECT * FROM todos WHERE id = ?";
  db.query(selectQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.json({
      success: true,
      message: "Todo is retrieved successfully",
      data: results[0],
    });
  });
};

export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  //check email
  if (email) {
    const checkEmailExistuery =
      "SELECT * FROM todos WHERE id != ? AND email =? ";

    db.query(checkEmailExistuery, [id, email], (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      if (results.length > 0) {
        return res
          .status(409)
          .json({ message: "This Email is already existed" });
      }
    });
  }

  let updateQuery: any;
  let updateData: any[] = [];

  if (name && email) {
    updateQuery = "UPDATE todos SET name = ?, email = ? WHERE id = ?";
    updateData = [name, email, id];
  }

  if (name && !email) {
    updateQuery = "UPDATE todos SET name = ? WHERE id = ?";
    updateData = [name, id];
  }

  if (email && !name) {
    updateQuery = "UPDATE todos SET email = ? WHERE id = ?";
    updateData = [email, id];
  }

  db.query(updateQuery, updateData, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
    res.status(200).json({
      success: true,
      message: "Todo is updated successfully",
      data: result,
    });
  });
};

export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteQuery = "DELETE FROM todos WHERE id = ?";
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
    res.status(200).json({
      success: true,
      message: "Todo is deleted successfully",
      data: result,
    });
  });
};
