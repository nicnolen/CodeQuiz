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

// Create a questions array
var questions = [
    {
        questionText: 'question 1',
        choices: ['a', 'b', 'c', 'd'],
        answer: 'a'
    },

    {
        questionText: 'question 2',
        choices: ['a', 'b', 'c', 'd'],
        answer: 'c'
    },  
    
    {
        questionText: 'question 3',
        choices: ['a', 'b', 'c', 'd'],
        answer: 'b'
    },  
    
    {
        questionText: 'question 4',
        choices: ['a', 'b', 'c', 'd'],
        answer: 'a'
    },  {
        questionText: 'question 5',
        choices: ['a', 'b', 'c', 'd'],
        answer: 'd'
    },
];

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
        } 
        // if timeLeft is 1, change display the timeLeft and add second
        else if (timeLeft === 1) {
            document.getElementById('timer').textContent = timeLeft + ' second remaining'
        }
        // if timeLeft is greater than 1, change second to seconds
        else {
            document.getElementById('timer').textContent = timeLeft + ' seconds remaining';
        }
        timeLeft--; // decrease the timer by 1 every second (1000ms = 1s)
    }, 1000);

    // add questions
    buildQuestionCard();
};

// Function to display the question with 4 answer choices
function buildQuestionCard() {
    // reference unordered list with class of 'question list' and create list item
    var questionListEl = document.getElementById('question-list');
    var questionEl = document.createElement('li');
    // set text content of unordered list to the questionText property of the questions array
    questionListEl.textContent = questions[0].questionText;
    // set the text content of the list item to the choices property of the questions array
    questionEl.textContent = questions[0].choices;
    // append the list item element to the end of the unordered list
    questionListEl.appendChild(questionEl);
};

// EVENT LISTENERS
// Run startGame when the start button is clicked
startButton.addEventListener('click', startGame);