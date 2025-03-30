const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",     // or your MySQL server address
    user: "root",          // MySQL username
    password: "",          // MySQL password
    database: "quizDB",    // The database you created
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL Database!");
});

module.exports = db;
