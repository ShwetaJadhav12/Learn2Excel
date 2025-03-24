// const checkboxes = document.querySelectorAll(".section-checkbox");
// const progressBar = document.getElementById("progressBar");
// const sections = document.querySelectorAll(".content-section");

// document.addEventListener("DOMContentLoaded", () => {
//   loadProgress();

//   checkboxes.forEach((checkbox) => {
//     checkbox.addEventListener("change", () => {
//       updateProgress();
//       saveProgress();
//     });
//   });

//   // Use IntersectionObserver to detect section visibility
//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           autoCheckSection(entry.target.id);
//         }
//       });
//     },
//     { threshold: 0.5 } // Trigger when 50% of the section is visible
//   );

//   sections.forEach((section) => {
//     observer.observe(section);
//   });
// });

// function autoCheckSection(sectionId) {
//   const index = Array.from(sections).findIndex(
//     (section) => section.id === sectionId
//   );
//   if (index !== -1) {
//     checkboxes[index].checked = true;
//     updateProgress();
//     saveProgress();
//   }
// }

// function updateProgress() {
//   const total = checkboxes.length;
//   const completed = Array.from(checkboxes).filter((cb) => cb.checked).length;
//   const percentage = (completed / total) * 100;
//   progressBar.style.width = `${percentage}%`;
// }

// function saveProgress() {
//   const progressState = Array.from(checkboxes).map((cb) => cb.checked);
//   localStorage.setItem("progressState", JSON.stringify(progressState));
// }

// function loadProgress() {
//   const savedProgress = JSON.parse(localStorage.getItem("progressState")) || [];
//   checkboxes.forEach((checkbox, index) => {
//     checkbox.checked = savedProgress[index] || false;
//   });
//   updateProgress();
// }

const checkboxes = document.querySelectorAll(".section-checkbox");
const progressBar = document.getElementById("progressBar");
const sections = document.querySelectorAll(".content-section");

document.addEventListener("DOMContentLoaded", () => {
  loadProgress();

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateProgress();
      saveProgress();
      checkModuleCompletion(); // Check if module is complete
    });
  });

  // IntersectionObserver for auto-checking
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          autoCheckSection(entry.target.id);
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  checkModuleCompletion(); // Check on page load
});

function autoCheckSection(sectionId) {
  const index = Array.from(sections).findIndex(
    (section) => section.id === sectionId
  );
  if (index !== -1) {
    checkboxes[index].checked = true;
    updateProgress();
    saveProgress();
    checkModuleCompletion();
  }
}

function updateProgress() {
  const total = checkboxes.length;
  const completed = Array.from(checkboxes).filter((cb) => cb.checked).length;
  const percentage = (completed / total) * 100;
  progressBar.style.width = `${percentage}%`;
}

function saveProgress() {
  const progressState = Array.from(checkboxes).map((cb) => cb.checked);
  localStorage.setItem("progressState", JSON.stringify(progressState));
}

function loadProgress() {
  const savedProgress = JSON.parse(localStorage.getItem("progressState")) || [];
  checkboxes.forEach((checkbox, index) => {
    checkbox.checked = savedProgress[index] || false;
  });
  updateProgress();
}

// ✅ Check if module is complete
function checkModuleCompletion() {
  const allChecked = Array.from(checkboxes).every((cb) => cb.checked);
  if (allChecked) {
    localStorage.setItem("module3Complete", true);
  } else {
    localStorage.setItem("module3Complete", false);
  }

  // Reflect status on the module card (in the main page)
  const moduleCard = document.getElementById("module3-card");
  if (localStorage.getItem("module3Complete") === "true") {
    moduleCard.classList.add("completed");
  } else {
    moduleCard.classList.remove("completed");
  }
}
