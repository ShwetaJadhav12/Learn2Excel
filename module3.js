
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
