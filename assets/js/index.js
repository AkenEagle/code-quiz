// Get elements
const btnStart = document.getElementById("btn-start");
const timeValue = document.getElementById("time-value");
const divQuiz = document.getElementById("quiz-box");

// Questions
const questions = [
    // 1
    {question: "1. We use _____ to link a CSS file to HTML",
    answers: ["<script>", "<link>", "<html>", "<css>"],
    correct: "<link>"},
    // 2
    {question: "2. The default value of a variable is _____",
    answers: ["200", "1", "true", "undefined"],
    correct: "undefined"},
    // 3
    {question: "3. JavaScript on its own is ________",
    answers: ["synchronous", "undefined", "asynchronous", "HTML"],
    correct: "synchronous"},
    // 4
    {question: "4. We use _______ to declare a read-only variable",
    answers: ["const", "let", "var", "new"],
    correct: "const"}
]

// To handle progress
let quizStep = 0;

// Timer
let timer;
let allowedTime = questions.length * 5; // How many seconds will the timer be set

// Function to render out of time
const renderGameOver = function () {
    divQuiz.innerHTML = "";

    const divContainer = document.createElement("div");
    divContainer.setAttribute("class", "game-over");
  
    const h2Element = document.createElement("h2");
    h2Element.textContent = "GAME OVER";
  
    divContainer.append(h2Element);
  
    divQuiz.append(divContainer);
}

// Timer function
const startTimer = function () {
    if (allowedTime <= 0) {
        clearInterval(timer);
        renderGameOver();
    } else {
        allowedTime -= 1;
        timeValue.textContent = allowedTime;
    }
}

// Function to render next question
const renderNextQuestion = function () {
    const divQuestion = document.getElementById("question");
    divQuestion.textContent = questions[quizStep].question;

    for (let i = 0; i < 4; i++) {
        const divAnswer = document.getElementById("btn-answer-"+i);
        divAnswer.textContent = questions[quizStep].answers[i];
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
const handleAnswer = function (event) {
    const target = event.target;

    if(target.getAttribute("class") === "btn-answer") {
        const clickedAnswer = target.textContent;
        let feedbackAnswer;
        if (clickedAnswer === questions[quizStep].correct) {
            feedbackAnswer = "Correct!";
            quizStep += 1;
            if(quizStep == questions.length) {
                clearInterval(timer);
                renderFinished();
            } else {
                renderNextQuestion();
            }
        } else {
            allowedTime -= 3;
            feedbackAnswer = "Wrong!";
        }
    
        // Display feedback
        if(!document.getElementById("answer-feedback")) {
            const divFeedback = document.createElement("div");
            divFeedback.setAttribute("class", "answer-feedback");
            divFeedback.setAttribute("id", "answer-feedback");
            divFeedback.textContent = feedbackAnswer;
            document.body.appendChild(divFeedback);    
        } else {
            clearInterval(feedbackTimer);
            document.getElementById("answer-feedback").textContent = feedbackAnswer;
        }
        feedbackTimer = setInterval(removeFeedback, 1000);
    }
}

// Function to render first question
const renderFirstQuestion = function () {
    divQuiz.innerHTML = "";

    // Load question
    const h2 = document.createElement("h2");
    h2.setAttribute("id", "question");
    const question = document.createTextNode(questions[quizStep].question);
    h2.appendChild(question);
    divQuiz.appendChild(h2);

    // Load answers
    for (let i = 0; i < 4; i++) {
        btn = document.createElement("div");
        btn.setAttribute("class", "btn-answer");
        btn.setAttribute("id", "btn-answer-"+i)
        const answer = document.createTextNode(questions[quizStep].answers[i]);
        btn.appendChild(answer);
        divQuiz.appendChild(btn);
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

    // Add click event to the options
    divQuiz.addEventListener('click', handleAnswer);
}

// Assign function to the button click event
btnStart.addEventListener("click", startQuiz);