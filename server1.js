const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change if your MySQL user is different
  password: "shweta@12", // Enter your MySQL password
  database: "quiz_app", // Change to your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// **Signup Route**
app.post("/signup", (req, res) => {
  const { fullName, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: err });

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [fullName, email, hash], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "User registered successfully!" });
    });
  });
});

// **Login Route**
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(401).json({ message: "User not found" });

    bcrypt.compare(password, results[0].password, (err, match) => {
      if (err) return res.status(500).json({ error: err });
      if (!match) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: results[0].id, name: results[0].name }, "secretkey", { expiresIn: "1h" });
      res.json({ token, name: results[0].name });
    });
  });
});

// **Start Server**
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
