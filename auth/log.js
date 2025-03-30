// Show Login Page if User Already Signed Up
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("userEmail")) {
        showLogin();
    }
});

// Switch to Login Page
function showLogin() {
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "block";
}

// Switch to Signup Page
function showSignup() {
    document.getElementById("signup").style.display = "block";
    document.getElementById("login").style.display = "none";
}

// Signup Function
function signup() {
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (!username || !email || !password) {
        alert("Please fill in all fields!");
        return;
    }

    // Store user data (You should store it in the database instead)
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("Signup successful! Redirecting to login...");
    showLogin();
}

// Login Function
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Fetch stored data
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
        alert("Login successful!");
        window.location.href = "dashboard.html"; // Redirect to dashboard after login
    } else {
        alert("Invalid email or password!");
    }
}
