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
}
// EVENT LISTENERS
// Run startGame when the start button is clicked
startButton.addEventListener('click', startGame);