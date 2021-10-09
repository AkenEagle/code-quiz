// Get elements
const btnStart = document.getElementById("btn-start");
const timeValue = document.getElementById("time-value");

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

// Function for the start button
const startQuiz = function () {
    // Start the timer
    timer = setInterval(startTimer, 1000);

    // Render first question
}

// Assign function to the button click event
btnStart.addEventListener("click", startQuiz);