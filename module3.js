
// // Toggle the menu when the hamburger icon is clicked
// function toggleMenu() {
//   const navbar = document.querySelector('.navbar');
//   navbar.classList.toggle('active');
// }
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let user = localStorage.getItem("user"); // Get user from local storage

  if (user) {
      // If user is logged in, show profile icon & name instead of Sign Up button
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
  window.location.reload(); // Refresh the page to update the navbar
}
