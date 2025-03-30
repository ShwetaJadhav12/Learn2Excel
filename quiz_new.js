const questions = [
  {
      question: "What type of farming focuses on growing crops and raising livestock on the same land?",
      options: ["Commercial Farming", "Mixed Farming", "Intensive Farming", "Organic Farming"],
      answer: 1
  },
  {
      question: "Which farming type involves moving livestock to find fresh pastures?",
      options: ["Plantation Farming", "Nomadic Herding", "Organic Farming", "Mixed Farming"],
      answer: 1
  },
  {
      question: "What is the main goal of commercial farming?",
      options: ["Profit-making", "Family consumption", "Land conservation", "Business"],
      answer: 0
  },
  {
      question: "Which farming type is commonly used for crops like tea, coffee, and rubber?",
      options: ["Aquaculture", "Extensive Farming", "Plantation Farming", "Organic Farming"],
      answer: 2
  },
  {
      question: "What is another name for fish farming?",
      options: ["Aquaculture", "Mixed Farming", "Intensive Farming", "Extensive Farming"],
      answer: 0
  },
  {
      question: "What is the first step in starting a garden?",
      options: ["Choosing a location", "Watering the plants", "Harvesting", "Soil selection"],
      answer: 0
  }
];

const user_id = 1; // Replace this with dynamic user ID if needed
let currentQuestionIndex = 0;
let selectedAnswers = Array(questions.length).fill(null);
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.querySelectorAll(".option");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const historyBtn = document.getElementById("history-btn");
const resultContainer = document.getElementById("result-container");
const historyContainer = document.getElementById("history-container");
const historyList = document.getElementById("history-list");

// Fetch quiz progress on page load
window.onload = async function () {
    try {
        const response = await fetch(`http://localhost:5000/get-progress/${user_id}`);
        const data = await response.json();

        if (data) {
            currentQuestionIndex = data.current_question;
            selectedAnswers = data.selected_answers ? JSON.parse(data.selected_answers) : Array(questions.length).fill(null);
        }
        loadQuestion();
    } catch (error) {
        console.error("Error fetching progress:", error);
    }
};
document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submit-btn");

  if (!submitBtn) {
      console.error("❌ Submit button not found in the DOM!");
  } else {
      console.log("✅ Submit button found. Attaching event listener...");
      submitBtn.addEventListener("click", submitQuiz);
  }
});


function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    optionsEl.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
        option.classList.remove("selected");
        if (selectedAnswers[currentQuestionIndex] === index) {
            option.classList.add("selected");
        }
    });

    prevBtn.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
    nextBtn.style.display = currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
}

function selectOption(index) {
    selectedAnswers[currentQuestionIndex] = index;
    optionsEl.forEach((option, i) => {
        option.classList.toggle("selected", i === index);
    });
    saveProgress();
}

function nextQuestion() {
    if (selectedAnswers[currentQuestionIndex] === null) {
        alert("Please select an answer!");
        return;
    }
    currentQuestionIndex++;
    loadQuestion();
    saveProgress();
}

function prevQuestion() {
    currentQuestionIndex--;
    loadQuestion();
    saveProgress();
}

// Save quiz progress in the database
async function saveProgress() {
    try {
        await fetch("http://localhost:5000/save-progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user_id,
                current_question: currentQuestionIndex,
                selected_answers: selectedAnswers,
            }),
        });
    } catch (error) {
        console.error("Error saving progress:", error);
    }
}

// Fetch quiz history
async function fetchHistory() {
    historyContainer.style.display = "block";
    historyList.innerHTML = "";

    try {
        const response = await fetch(`http://localhost:5000/get-history/${user_id}`);
        const history = await response.json();

        if (history.length === 0) {
            historyList.innerHTML = "<li>No quiz history found.</li>";
        } else {
            history.forEach((entry) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>Score:</strong> ${entry.score}/${entry.total_questions} <br> <strong>Date:</strong> ${new Date(entry.timestamp).toLocaleString()}`;
                historyList.appendChild(listItem);
            });
        }
    } catch (error) {
        console.error("Error fetching history:", error);
    }
}

async function submitQuiz() {
    console.log("✅ Submit button clicked!");

    let score = 0;
    resultContainer.innerHTML = "<h3>Quiz Results:</h3>";

    questions.forEach((question, index) => {
        const userAnswer = selectedAnswers[index];
        const isCorrect = userAnswer === question.answer;

        if (isCorrect) score++;

        resultContainer.innerHTML += `
            <div class="result-item ${isCorrect ? "correct" : "wrong"}">
                <strong>Q${index + 1}:</strong> ${question.question} <br>
                Your Answer: ${userAnswer !== null ? question.options[userAnswer] : "No Answer"}<br>
                Correct Answer: ${question.options[question.answer]}
            </div>
        `;
    });

    resultContainer.innerHTML += `<p><strong>Your Score:</strong> ${score}/${questions.length}</p>`;
    resultContainer.style.display = "block";

    console.log("📤 Sending data to /save-history:", { user_id, score, total_questions: questions.length, answers: selectedAnswers });

    await saveHistory(score);
}

// Add event listener to the submit button
submitBtn.addEventListener("click", submitQuiz);

// Save quiz history in the database
async function saveHistory(score) {
    try {
        const response = await fetch("http://localhost:5000/save-history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user_id,
                score: score,
                total_questions: questions.length,
                answers: selectedAnswers
            }),
        });

        console.log("📩 Server response:", response);
        const result = await response.json();
        console.log("📩 Server result:", result);

        if (response.ok) {
            alert("✅ History saved successfully!");
        } else {
            alert("❌ Failed to save history: " + result.message);
        }
    } catch (error) {
        console.error("⚠️ Error saving history:", error);
        alert("⚠️ Error saving history. Check console for details.");
    }
}

// Initialize the first question
loadQuestion();
