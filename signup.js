function signUp() {
    let fullName = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (fullName === "" || email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === "User registered successfully!") {
            window.location.href = "login.html"; // Redirect to login page
        }
    })
    .catch(error => console.error("Error:", error));
}
