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

    const btnGoBack = document.createElement("button");
    btnGoBack.setAttribute("class", "btn-start btn-goback");

    const link = document.createElement("a");
    link.setAttribute("href", "./index.html");
    link.innerText = "Go Back";

    btnGoBack.append(link);

    divQuiz.append(btnGoBack);
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

const getFromLocalStorage = function (key, defaultValue) {
    const localStorageData = JSON.parse(localStorage.getItem(key));
  
    if (!localStorageData) {
      return defaultValue;
    } else {
      return localStorageData;
    }
  };

const storeScore = function (event) {
    event.preventDefault();

    // get count value
    const score = allowedTime;
  
    // get user initials from input
    const initials = document.getElementById("user-initials").value;
  
    // construct score object
    const scoreObject = {
      score: score,
      initials: initials,
    };
  
    // get from LS before inserting object
    const highscores = getFromLocalStorage("highscores", []);
  
    // insert the score object
    highscores.push(scoreObject);
  
    // write back to LS
    localStorage.setItem("highscores", JSON.stringify(highscores));

    // Send to highscores page
    location.assign("./highscores.html");
  };

// Function to render when the questions finish
const renderFinished = function () {
    divQuiz.innerHTML = "";

    const divContainer = document.createElement("div");
    divContainer.setAttribute("class", "container score-form");
  
    const form = document.createElement("form");
  
    const h2Element = document.createElement("h2");
    h2Element.setAttribute("class", "question");
    h2Element.textContent = "All Done! Your score is " + allowedTime;
  
    const formContainer = document.createElement("div");
    formContainer.setAttribute("class", "form-container");
  
    const formInputDiv = document.createElement("div");
    formInputDiv.setAttribute("class", "form-item");
  
    const formInput = document.createElement("input");
    formInput.setAttribute("placeholder", "Enter your initials");
    formInput.setAttribute("id", "user-initials");
  
    const formButtonDiv = document.createElement("div");
    formButtonDiv.setAttribute("class", "form-item");
  
    const formButton = document.createElement("button");
    formButton.setAttribute("class", "btn-start");
    formButton.textContent = "Submit";
  
    formInputDiv.append(formInput);
    formButtonDiv.append(formButton);
  
    formContainer.append(formInputDiv, formButtonDiv);
  
    form.append(h2Element, formContainer);
    divContainer.append(form);
  
    form.addEventListener("submit", storeScore);
  
    divQuiz.appendChild(divContainer);
};

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
            if(feedbackAnswer === "Correct!") {
                divFeedback.setAttribute("class", "alert-success answer-feedback");
            } else {
                divFeedback.setAttribute("class", "alert-danger answer-feedback");
            }
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

const initialLocalStorage = function () {
    const dataFromLS = JSON.parse(localStorage.getItem("highscores"));
  
    if (!dataFromLS) {
      localStorage.setItem("highscores", JSON.stringify([]));
    }
  };

// Function for the start button
const startQuiz = function () {
    initialLocalStorage();

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