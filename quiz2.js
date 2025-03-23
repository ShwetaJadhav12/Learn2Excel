const questions = [
    {
        question: "Which type of soil is best suited for growing vegetables due to its good drainage and nutrient retention?",
        options: ["Clay Soil", "Sandy Soil", "Loamy Soil", "Peaty Soil"],
        answer: 2
    },
    {
        question: "Which soil type is ideal for crops that require good drainage but low water retention?",
        options: ["Clay Soil", "Sandy Soil", "Loamy Soil", "Silty Soil"],
        answer: 1
    },
    {
        question: "What is the best season to plant leafy greens like spinach and lettuce?",
        options: ["Summer", "Winter", "Spring", "Monsoon"],
        answer: 2
    },
    {
        question: "What type of composting involves breaking down organic matter using worms?",
        options: ["Hot Composting", "Cold Composting", "Vermicomposting", "Anaerobic Composting"],
        answer: 2
    },
    {
        question: "Which soil type becomes sticky when wet and hard when dry, making it challenging for root growth?",
        options: ["Loamy Soil", "Sandy Soil", "Clay Soil", "Peaty Soil"],
        answer: 2
    },
    {
        question: "Which type of composting requires turning the pile regularly to speed up the decomposition process?",
        options: ["Cold Composting", "Hot Composting", "Vermicomposting", "Sheet Composting"],
        answer: 1
    },
    {
        question: "What is the benefit of adding compost to garden soil?",
        options: ["Increases soil acidity", "Reduces water retention", "Improves soil structure and nutrients", "Reduces plant growth"],
        answer: 2
    },
    {
        question: "Which soil type is rich in organic matter and retains moisture well, making it suitable for root crops?",
        options: ["Sandy Soil", "Peaty Soil", "Loamy Soil", "Clay Soil"],
        answer: 1
    },
    {
        question: "What is the main purpose of mulching in gardening?",
        options: ["To attract insects", "To reduce weed growth and retain moisture", "To increase soil acidity", "To reduce composting"],
        answer: 1
    }
    
];
  
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswers = Array(questions.length).fill(null);
    const questionEl = document.getElementById('question');
    const optionsEl = document.querySelectorAll('.option');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result-container');
    
    function loadQuestion() {
      const currentQuestion = questions[currentQuestionIndex];
      questionEl.textContent = currentQuestion.question;
    
      optionsEl.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
        option.classList.remove('selected');
        if (selectedAnswers[currentQuestionIndex] === index) {
          option.classList.add('selected');
        }
      });
    
      prevBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
      nextBtn.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
      submitBtn.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
    }
    
    function selectOption(index) {
      selectedAnswers[currentQuestionIndex] = index;
      optionsEl.forEach((option, i) => {
        option.classList.toggle('selected', i === index);
      });
    }
    
    function nextQuestion() {
      if (selectedAnswers[currentQuestionIndex] === null) {
        alert('Please select an answer!');
        return;
      }
      currentQuestionIndex++;
      loadQuestion();
    }
    
    function prevQuestion() {
      currentQuestionIndex--;
      loadQuestion();
    }
    
    function submitQuiz() {
      let score = 0;
      resultContainer.innerHTML = '<h3>Quiz Results:</h3>';
      
      questions.forEach((question, index) => {
        const userAnswer = selectedAnswers[index];
        const isCorrect = userAnswer === question.answer;
        
        if (isCorrect) score++;
    
        resultContainer.innerHTML += `
          <div class="result-item ${isCorrect ? 'correct' : 'wrong'}">
            <strong>Q${index + 1}:</strong> ${question.question} <br>
            Your Answer: ${userAnswer !== null ? question.options[userAnswer] : 'No Answer'}<br>
            Correct Answer: ${question.options[question.answer]}
          </div>
        `;
      });
    
      resultContainer.innerHTML += `<p><strong>Your Score:</strong> ${score}/${questions.length}</p>`;
      resultContainer.style.display = 'block';
    }
    
    // Initialize first question
    loadQuestion();
    