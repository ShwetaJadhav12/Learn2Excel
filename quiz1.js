let totalQuestions = 5; // Total number of questions
let answeredQuestions = 0; // Counter for answered questions
let correctAnswers = 0; // Correct answers counter
let incorrectAnswers = 0; // Incorrect answers counter

function checkAnswer(question) {
    let selected = document.querySelector(`input[name="${question}"]:checked`);
    let feedback = document.getElementById(`${question}-feedback`);

    if (selected) {
        if (selected.value === "correct") {
            feedback.innerHTML = "✅ Correct!";
            feedback.style.color = "green";
            correctAnswers++;
        } else {
            feedback.innerHTML = "❌ Wrong! Try again.";
            feedback.style.color = "red";
            incorrectAnswers++;
        }

        // Disable further selections for this question
        let options = document.getElementsByName(question);
        options.forEach(option => option.disabled = true);

        // Update progress
        answeredQuestions++;
        updateProgress();
    } else {
        feedback.innerHTML = "⚠️ Please select an answer!";
        feedback.style.color = "orange";
    }
}

function updateProgress() {
    let progressPercent = (answeredQuestions / totalQuestions) * 100;
    let correctPercent = (correctAnswers / totalQuestions) * 100;
    let incorrectPercent = (incorrectAnswers / totalQuestions) * 100;

    document.getElementById("progress-bar").style.width = progressPercent + "%";
    document.getElementById("progress-text").innerText = `Progress: ${progressPercent}%`;

    // Update score display
    document.getElementById("score-text").innerText = 
        `Correct Answers: ${correctPercent.toFixed(2)}% | Incorrect Answers: ${incorrectPercent.toFixed(2)}%`;
}