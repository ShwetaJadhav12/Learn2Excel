document.addEventListener("DOMContentLoaded", () => {
    let user = localStorage.getItem("user");

    if (user) {
        document.getElementById("nav-user").innerHTML = `
            <div class="user-info">
                <img src="profile-icon.png" alt="User" class="profile-icon">
                <span>${user}</span>
                <button onclick="logout()" class="logout-btn">Logout</button>
            </div>
        `;
    }
});

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload(); // Refresh to update navbar
}
