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
let allowedTime = 60; // How many seconds will the timer be set

// Function to render out of time
const renderOutOfTime = function () {
    console.log("out of time");
}

// Timer function
const startTimer = function () {
    if (allowedTime === 0) {
        clearInterval(timer);
        renderOutOfTime();
    } else {
        allowedTime -= 1;
        timeValue.textContent = allowedTime;
    }
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
    divQuiz.innerHTML = "";

    const h2 = document.createElement("h2");
    h2.innerText = "All done!"
    divQuiz.appendChild(h2);

    const div = document.createElement("div");
    div.setAttribute("class", "div-initials");
    const p = document.createElement("p");
    p.innerText = "Enter initials:";
    div.appendChild(p);
    const textarea = document.createElement("textarea");
    div.appendChild(textarea);
    divQuiz.appendChild(div);
}

// Answer feedback timer and function to remove it after 1 sec
let feedbackTimer;
const removeFeedback = function () {
    const answerFeedback = document.getElementById("answer-feedback");
    document.body.removeChild(answerFeedback);
    clearInterval(feedbackTimer);
}

// Function to handle an answer
const handleAnswer = function () {
    quizStep += 1;
    if(quizStep == questions.length) {
        clearInterval(timer);
        renderFinished();
        return;
    } else {
        const clickedAnswer = this.textContent;
        let feedbackAnswer;
        if (correctAnswers.includes(clickedAnswer)) {
            feedbackAnswer = "Correct!"
        } else {
            allowedTime -= 3;
            feedbackAnswer = "Wrong!"
        }

        // Display feedback
        const divFeedback = document.createElement("div");
        divFeedback.setAttribute("class", "answer-feedback");
        divFeedback.setAttribute("id", "answer-feedback");
        const feedbackText = document.createTextNode(feedbackAnswer);
        divFeedback.appendChild(feedbackText);
        document.body.appendChild(divFeedback);
        feedbackTimer = setInterval(removeFeedback, 1000);
        renderNextQuestion();
    }
}

// Function to render first question
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
    // Set timer text
    timeValue.textContent = allowedTime;
    // Start the timer
    timer = setInterval(startTimer, 1000);

    // Render first question
    renderFirstQuestion();
}

// Assign function to the button click event
btnStart.addEventListener("click", startQuiz);