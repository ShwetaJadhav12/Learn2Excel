const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database connection using connection pool (better performance)
const db = mysql.createPool({
    host: 'localhost', 
    user: 'root', 
    password: "shweta@12", 
    database: 'quiz_app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Check database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
    } else {
        console.log('✅ Connected to MySQL database');
        connection.release();
    }
});

// API to save quiz progress (for cooking quiz)
app.post('/save-progress', (req, res) => {
    const { user_id, current_question, selected_answers } = req.body;

    if (!user_id || current_question === undefined || !selected_answers) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `
        INSERT INTO quiz_cooking_progress (user_id, current_question, selected_answers)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE current_question = VALUES(current_question), selected_answers = VALUES(selected_answers)
    `;

    db.query(query, [user_id, current_question, JSON.stringify(selected_answers)], (err, result) => {
        if (err) {
            console.error('❌ Error saving progress:', err);
            return res.status(500).json({ error: 'Failed to save quiz progress' });
        }
        res.json({ message: '✅ Quiz progress saved successfully' });
    });
});

// API to get quiz progress (for cooking quiz)
app.get('/get-progress/:user_id', (req, res) => {
    const { user_id } = req.params;

    const query = 'SELECT * FROM quiz_cooking_progress WHERE user_id = ?';
    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('❌ Error fetching progress:', err);
            return res.status(500).json({ error: 'Failed to fetch quiz progress' });
        }
        res.json(results.length > 0 ? results[0] : null);
    });
});

// API to save quiz history (for cooking quiz)
app.post('/save-history', (req, res) => {
    const { user_id, score, total_questions, answers } = req.body;

    if (!user_id || score === undefined || !total_questions) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = 'INSERT INTO quiz_cooking_history (user_id, score, total_questions, answers) VALUES (?, ?, ?, ?)';
    
    db.query(query, [user_id, score, total_questions, JSON.stringify(answers)], (err, result) => {
        if (err) {
            console.error('❌ Error inserting quiz history:', err);
            return res.status(500).json({ error: 'Failed to save quiz history' });
        }
        res.json({ message: '✅ Quiz history saved successfully', id: result.insertId });
    });
});

// API to fetch quiz history (for cooking quiz)
app.get('/get-history/:user_id', (req, res) => {
    const { user_id } = req.params;

    const query = 'SELECT * FROM quiz_cooking_history WHERE user_id = ? ORDER BY timestamp DESC';
    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('❌ Error fetching history:', err);
            return res.status(500).json({ error: 'Failed to fetch quiz history' });
        }
        res.json(results);
    });
});

// Reset quiz progress for cooking quiz
app.post("/reset-progress", async (req, res) => {
    const { user_id } = req.body;

    try {
        await db.query("UPDATE quiz_cooking_progress SET current_question = 0, selected_answers = '[]' WHERE user_id = ?", [user_id]);
        res.json({ success: true, message: "🍽️ Cooking quiz progress reset!" });
    } catch (error) {
        console.error("❌ Error resetting progress:", error);
        res.status(500).json({ success: false, message: "Failed to reset progress" });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
