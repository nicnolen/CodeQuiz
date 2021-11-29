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

// reference unordered list with class of 'question list' and create list item
var questionListEl = document.getElementById('question-list');
var questionEl = document.createElement('li');

 // counter starts counting down from 60 seconds
 var timeLeft = 60 

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

// Variable to store the answer choices
var answerChoices = [];

// FUNCTIONS
function startGame() {
    // hide header
    header.classList.add('hide');
    // hide start box
    startBox.classList.add('hide');
    // unhide quiz box
    quizBox.classList.remove('hide')
    
    // create a timer that counts down every one second (1000ms) from the timeLeft variable
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
    showQuestions();
};

 // Function to display the question with 4 answer choices
function showQuestions() {
    // variable to store the HTML output
    var output = [];

    // for each question
    questions.forEach((currentQuestion) => {
        // for each available answer
        for (var letter of currentQuestion.choices){
            // add HTML radio button
            answerChoices.push(
                `<label>
                <input type="radio" name="choices${currentQuestion.choices}" value="${letter}
                ${letter}:
                ${currentQuestion.choices[letter]}
                </label>`
            );
        }

        // add this question and its answers to the output
        output.push(
            `<div class="question"> ${currentQuestion.questionText} </div>
            <div class="choices"> ${answerChoices} </div>`
        );
    });

    // combine output list into one string of HTML
    questionListEl.innerHTML = output.join('');
};

// set the text content of the unordered list to the answer
function showAnswers() {
    for (i = 0; i < questions.length; i++) {
        if (answerChoices === questions.answer) {
            questionListEl.textContent = 'Correct!'
        } else {
            questionListEl.textContent = 'The correct answer is ' + questions[i].answer;
            // subtract 2 seconds for every wrong answer
            newTime = timeLeft -= 2;
            document.getElementById('timer').innerHTML='00:'+timeLeft;
        }
    }
}

// EVENT LISTENERS
// Run startGame when the start button is clicked
startButton.addEventListener('click', startGame);

// Run showAnswer when the submit answer button is clicked
quizButton.addEventListener('click', showAnswers)