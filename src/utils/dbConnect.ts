import mysql from "mysql";
import config from "../config";


export const db = mysql.createConnection({
  host: config.host,
  user: config.username, // Replace with your MySQL username
  password: config.password, // Replace with your MySQL password
  database: config.database, // Replace with your database name
});


const dbConnect = () => {

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database");
  });
};

export default dbConnect;
