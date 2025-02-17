import mysql from "mysql";

const dbConnect = () => {
  const db = mysql.createConnection({
    host: "localhost",
    user: "goni715", // Replace with your MySQL username
    password: "85035785#", // Replace with your MySQL password
    database: "todo", // Replace with your database name
  });

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database");
  });
};

export default dbConnect;
