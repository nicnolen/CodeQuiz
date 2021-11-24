// GLOBAL VARIABLES
// Tie buttons into index.html
var startButton = document.querySelector('.start');
var quizButton = document.querySelector('.answer');
var scoreButton = document.querySelector('.score');

// Tie boxes into index.html
var header = document.querySelector('header');
var startBox = document.getElementById('start-box');
var quizBox = document.getElementById('quiz-box');
var endBox = document.getElementById('end-box');

// FUNCTIONS
function startGame() {
    // hide header
    header.classList.add('hide');
    // hide start box
    startBox.classList.add('hide');
    // unhide quiz box
    quizBox.classList.remove('hide')

    // create a countdown from 60 seconds (60000 milliseconds)
    var timeLeft = 60 // counter starts counting down from 60 seconds
    var countdown = setInterval(function(){
        if(timeLeft <= 0) {
            clearInterval(countdown); // clearInterval stops the countdown function from running
            document.getElementById('timer').textContent = "Time's up!"
        } else {
            document.getElementById('timer').textContent = timeLeft + " seconds remaining";
        }
        timeLeft--; // decrease the timer by 1 every second (1000ms = 1s)
    }, 1000);
};
// EVENT LISTENERS
// Run startGame when the start button is clicked
startButton.addEventListener('click', startGame);