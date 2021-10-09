// Get elements
const btnStart = document.getElementById("btn-start");
const timeValue = document.getElementById("time-value");
const divQuiz = document.getElementById("quiz-box");

// To handle progress
let quizStep = 0;

// Questions
let questions = [
    "1. We use _____ to link a CSS file to HTML",
    "2. The default value of a variable is ______"
]

// Answers
let answers = [
    [
        "<script>", "<link>", "<html>", "<css>"
    ],

    [
        "undefined", "true", "256", "1"
    ]
]

// Correct answer number
let correctAnswers = [
    "<link>",
    "undefined"
]

// Timer
let timer;
let allowedTime = 3; // How many seconds will the timer be set

// Timer function
const startTimer = function () {
    timeValue.textContent = allowedTime;
    if (allowedTime === 0) {
        clearInterval(startTimer);

    } else {
        allowedTime -= 1;
    }
}

// Function to display answer feedback
const answerFeedback = function (text) {

}

// Function to render next question
const renderNextQuestion = function () {
    const question = document.getElementById("question");
    question.textContent = questions[quizStep];

    for (let i = 0; i < 4; i++) {
        const answer = document.getElementById("btn-answer-"+i);
        answer.textContent = answers[quizStep][i];
    }
}

// Function to render when the questions finish
const renderFinished = function () {
    
}

// Function to handle an answer
const handleAnswer = function () {
    const clickedAnswer = this.textContent;
    let feedbackAnswer;
    if (correctAnswers.includes(clickedAnswer)) {
        feedbackAnswer = "Correct!"
    } else {
        feedbackAnswer = "Wrong!"
    }

    // Display feedback
    const divFeedback = document.createElement("div");
    divFeedback.setAttribute("class", "answer-feedback")
    const feedbackText = document.createTextNode(feedbackAnswer);
    divFeedback.appendChild(feedbackText);
    divQuiz.appendChild(divFeedback);
    setTimeout(function() {
        divQuiz.removeChild(divFeedback);
    }, 1000);

    quizStep += 1;
    if(quizStep == questions.length) {
        renderFinished();
    } else {
        renderNextQuestion();
    }
}

// Function to render a question
const renderFirstQuestion = function () {
    divQuiz.innerHTML = "";

    // Load question
    const h2 = document.createElement("h2");
    h2.setAttribute("id", "question");
    const question = document.createTextNode(questions[quizStep]);
    h2.appendChild(question);
    divQuiz.appendChild(h2);

    // Load answers
    for (let i = 0; i < 4; i++) {
        btn = document.createElement("div");
        btn.setAttribute("class", "btn-answer");
        btn.setAttribute("id", "btn-answer-"+i)
        const answer = document.createTextNode(answers[quizStep][i]);
        btn.appendChild(answer);
        divQuiz.appendChild(btn);
        btn.addEventListener("click", handleAnswer);
    }
}

// Function for the start button
const startQuiz = function () {
    // Start the timer
    timer = setInterval(startTimer, 1000);

    // Render first question
    renderFirstQuestion();
}

// Assign function to the button click event
btnStart.addEventListener("click", startQuiz);