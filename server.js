// const mysql = require("mysql2");

// const db = mysql.createConnection({
//     host: "localhost",  // Change if using a remote database
//     user: "root",       // Your MySQL username
//     password: "",       // Your MySQL password
//     database: "quiz_app", // Database name you created
// });

// // Connect to MySQL
// db.connect((err) => {
//     if (err) {
//         console.error("Database connection failed:", err);
//     } else {
//         console.log("Connected to MySQL Database");
//     }
// });

// module.exports = db; // Export the connection for use in other files
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // Import MySQL connection

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/save-progress", (req, res) => {
    const { user_id, current_question, selected_answers } = req.body;
    
    const query = `
        INSERT INTO user_progress (user_id, current_question, selected_answers)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE current_question = VALUES(current_question), selected_answers = VALUES(selected_answers)
    `;

    db.query(query, [user_id, current_question, JSON.stringify(selected_answers)], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Progress saved successfully" });
    });
});
app.get("/get-progress/:user_id", (req, res) => {
    const { user_id } = req.params;
    const query = "SELECT current_question, selected_answers FROM user_progress WHERE user_id = ?";

    db.query(query, [user_id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            res.send(results[0]);
        } else {
            res.send({ current_question: 0, selected_answers: [] });
        }
    });
});
app.post("/save-history", (req, res) => {
    const { user_id, score, total_questions, answers } = req.body;
    
    const query = `
        INSERT INTO quiz_history (user_id, score, total_questions, answers)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [user_id, score, total_questions, JSON.stringify(answers)], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "History saved successfully" });
    });
});
app.get("/get-history/:user_id", (req, res) => {
    const { user_id } = req.params;
    const query = "SELECT * FROM quiz_history WHERE user_id = ? ORDER BY timestamp DESC";

    db.query(query, [user_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});
