// GLOBAL VARIABLES
// Tie buttons and boxes to index.html
// startBox
var header = document.querySelector('header');
var startBox = document.getElementById('start-box');
var startButton = document.querySelector('.start');

// questionBox 
var quizBox = document.getElementById('quiz-box');
var questionButtons = document.getElementById('questionButtons');
// current question being displayed
var questionNumber = document.getElementById('questionNumber')
// button for next question
var nextButton = document.querySelector('.next');

// answer choices and answer buttons
var choiceButton1 = document.querySelector('.choiceButton1')
var choiceButton2 = document.querySelector('.choiceButton2')
var choiceButton3 = document.querySelector('.choiceButton3')
var choiceButton4 = document.querySelector('.choiceButton4')
var answer = document.querySelector('.answer')

// results
var resultsBox = document.getElementById('end-box');
var resultsButton = document.querySelector('.score');

// highScoreBox
var highScoreBox = document.getElementById('score-box')
var highScoreButton = document.getElementById('highScoreButton')

// Reference unordered list with class of 'explanation' to show if answer is right or wrong
var explanationEl  = document.getElementById('explanation');

// Counter starts counting down from 60 seconds
var timeLeft = 60

// timer
var timer = 0;

// Number of questions correct
var numCorrect = 0;

// questions index
var i = 0;

// Create a questions array
var questions = [
    {
        questionText: 'What does the push() method do?',
        choice1: "a: 'Adds any content between the parenthesis to the end of the specified array'", 
        choice2: "b: 'Removes the last element of an array and returns that element'", 
        choice3: "c: 'Removes the first element from an array and returns that removed element'", 
        choice4: "d: 'Adds any content between the parenthesis to the start of the specified array'",
        answer: "a: 'Adds any content between the parenthesis to the end of the specified array'"
    },

    {
        questionText: 'What does the parseInt() function do?',
        choice1: "a:'Converts a number to a JSON string'", 
        choice2: "b: 'Converts a number to a string'", 
        choice3: "c: 'Converts a string to a number'", 
        choice4: "d: 'Converts a JSON string to a number'",
        answer: "c: 'Converts a string to a number'",
    },  
    
    {
        questionText: 'What is JavaScript responsible for on a webpage?',
        choice1: "a:'The structure of the page'", 
        choice2: "b: 'The design of the page'", 
        choice3: "c: 'Version control'", 
        choice4: "d: 'The behavior of the page'",
        answer: "d: 'The behavior of the page'",
    },  
    
    {
        questionText: 'How do you save array data to localStorage?',
        choice1: "a:'setItem()'", 
        choice2:"b:'getItem'", 
        choice3:"c: 'JSON.stringify(array)'", 
        choice4: "d: 'Both A and C'",
        answer: "d: 'Both A and C'",
    },  
    
    {
        questionText: 'What are the components of .addEventListener and what order do they go in?',
        choice1: "a:'(eventListener, eventHandler)'", 
        choice2: "b:'(eventHandler, eventListener)'", 
        choice3: "c: '(event, function())'", 
        choice4: "d: '(event, eventListener)'",
        answer: "a:'(eventListener, eventHandler)'",
    },
];

// FUNCTIONS
function startGame() {
    // hide header
    header.classList.add('hide');
    // hide start box
    startBox.classList.add('hide');
    // hide the results box
    resultsBox.classList.add('hide');
    // hide the high score box
    highScoreBox.classList.add('hide');
    // unhide quiz box
    quizBox.classList.remove('hide');
    
    // create a timer that counts down every one second (1000ms) from the timeLeft variable
    var countdown = setInterval(function(){
        if(timeLeft <= 0) {
            clearInterval(countdown); // clearInterval stops the countdown function from running
            document.getElementById('timer').textContent = "Time's up!";
            gameOver();
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
    
    // runs gameEnds function if timer runs out
    if (timeLeft <= 0) {
        gameOver;
    }
    // add questions
    continueGame();
};

// Check to see if the game should end or keep going
function continueGame() {
    if (i === (questions.length -1)) {
        clearInterval(timer);
        // Hide the questions
        quizBox.classList.add('hide');
        resultsBox.classList.remove('hide');
        resultsBox.textContent = 'The quiz is done! Lets see how you did!'
        resultsButton.addEventListener('click', function() {
            gameEnds();
        })
    } else {
        i++;
        showQuestions();
    }
}

 // Function to display the question with 4 answer choices
function showQuestions() {
    // display the question
    questionNumber.textContent = questions[i].questionText;
    // display choices on the DOM
    choiceButton1.textContent = questions[i].choice1;
    choiceButton2.textContent = questions[i].choice2;
    choiceButton3.textContent = questions[i].choice3;
    choiceButton4.textContent = questions[i].choice4;  
    console.log(showQuestions);   
};

// set the text content of the unordered list to the answer
function showAnswers(event) {
    // keep track of user answers
    var userAnswer = event.target.textContent;
    var correctAnswer = questions[i].answer;
    console.log(event.target);

    // for each question
    if (event.target.matches('button')) {

        // if the answer is correct
        if (userAnswer === correctAnswer) {
            // say correct
             explanationEl.textContent = 'Correct!'

            // add to the number correct
            numCorrect ++;
        }
        // if the answer is wrong or blank
        else {
            // say what the correct answer is
             explanationEl.textContent = 'Incorrect, the correct answer is ' + correctAnswer;
            
            // subtract 2 seconds for each incorrect answer
            timeLeft -= 2;

        }
        continueGame();
    }
}

// takes you to the game over card
function gameOver() {
    // clears the time 
    clearInterval(timer);
    // hides the questions card
    quizBox.classList.add('hide');
    // display the gameOver card
    resultsBox.classList.remove('hide');
    resultsButton.classList.remove('hide');
};

// END OF THE GAME  and display the scorecard
function gameEnds() {

    highScoreBox.classList.remove('hide');
    playersFinalScoreDisplay.textContent = numCorrect + ' out of ' + questions.length;
};

// EVENT LISTENERS
// Run startGame when the start button is clicked
startButton.addEventListener('click', startGame);

// Run showAnswer when the Next Question button is clicked
nextButton.addEventListener('click', showAnswers)

// when the user answers a question, continue the game
questionButtons.addEventListener('click', showAnswers);

 // waits for click to take you to the scoreboard
 resultsButton.addEventListener('click', function () {
    gameEnds();
});


