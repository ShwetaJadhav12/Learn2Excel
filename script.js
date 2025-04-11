
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
    const openFarmingBtn = document.getElementById("open-farming");
    if (openFarmingBtn) {
        openFarmingBtn.addEventListener("click", function () {
            window.location.href = "farming.html";
        });
    }

    // You can add other event listeners the same way:
    const openCookingBtn = document.getElementById("open-cooking");
    if (openCookingBtn) {
        openCookingBtn.addEventListener("click", function () {
            window.location.href = "cooking.html";
        });
    }

    const openSelfdefenceBtn = document.getElementById("open-selfdefence");
    if (openSelfdefenceBtn) {
        openSelfdefenceBtn.addEventListener("click", function () {
            window.location.href = "selfdefence.html";
        });
    }

    const openFinanceBtn = document.getElementById("open-finance");
    if (openFinanceBtn) {
        openFinanceBtn.addEventListener("click", function () {
            window.location.href = "finance.html";
        });
    }
});


    
