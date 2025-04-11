
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (!hamburger || !navLinks) {
        console.error("Navbar elements not found!");
        return;
    }

    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
});

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload(); // Refresh the page to update the navbar
}
