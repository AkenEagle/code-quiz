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

// Timer
let timer;
let allowedTime = 3; // How many seconds will the timer be set

// Timer function
const startTimer = function () {
    if (allowedTime === 0) {
        clearInterval(startTimer);
    } else {
        allowedTime -= 1;
        timeValue.textContent = allowedTime;
    }
}

// Function to render a question
const renderQuestion = function () {
    divQuiz.innerHTML = "";

    // Load question
    const h2 = document.createElement("h2");
    const question = document.createTextNode(questions[quizStep]);
    h2.appendChild(question);
    divQuiz.appendChild(h2);

    // Load answers
    for (let i = 0; i < 4; i++) {
        const btn = document.createElement("div");
        btn.setAttribute("class", "btn-answer");
        const answer = document.createTextNode(answers[quizStep][i]);
        btn.appendChild(answer);
        divQuiz.appendChild(btn);
    }

}

// Function for the start button
const startQuiz = function () {
    // Start the timer
    timer = setInterval(startTimer, 1000);

    // Render first question
    renderQuestion();
}

// Assign function to the button click event
btnStart.addEventListener("click", startQuiz);