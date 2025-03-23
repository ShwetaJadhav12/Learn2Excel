const questions = [
  {
      question: "What type of farming focuses on growing crops and raising livestock on the same land?",
      options: ["Commercial Farming", "Mixed Farming", "Intensive Farming","Organic farming"],
      answer: 1
  },
  {
      question: "Which farming type involves moving livestock to find fresh pastures?",
      options: ["Plantation Farming", "Nomadic Herding", "Organic Farming","Mixed Farming"],
      answer: 1
  },
  {
      question: "What is the main goal of commercial farming?",
      options: ["Profit-making", "Family consumption", "Land conservation","Business"],
      answer: 0
  },
  {
      question: "Which farming type is commonly used for crops like tea, coffee, and rubber?",
      options: ["Aquaculture", "Extensive Farming", "Plantation Farming","organuc Farming"],
      answer: 2
  },
  {
      question: "What is another name for fish farming?",
      options: ["Aquaculture", "Mixed Farming", "Intensive Farming","Extensive Farming"],
      answer: 0
  },
  {
      question: "What is the first step in starting a garden?",
      options: ["Choosing a location", "Watering the plants", "Harvesting","soil selection"],
      answer: 0
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
  