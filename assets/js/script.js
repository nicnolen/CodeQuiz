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

// answer choices and answer buttons
var choiceButton1 = document.querySelector('.choiceButton1')
var choiceButton2 = document.querySelector('.choiceButton2')
var choiceButton3 = document.querySelector('.choiceButton3')
var choiceButton4 = document.querySelector('.choiceButton4')
var answer = document.querySelector('.answer')

// results
var resultsBox = document.getElementById('end-box');
var resultsButton = document.querySelector('.results');

// highScoreBox
var highScoreBox = document.getElementById('score-box')
var highScoreButton = document.getElementById('highScoreButton')

// set initials to playerInitials
var initials = document.getElementById('playerInitials');

// Reference unordered list with class of 'explanation' to show if answer is right or wrong
var explanationEl  = document.getElementById('explanation');
// add style
explanationEl.classList.add('reason')

// Counter starts counting down from 60 seconds
var timeLeft = 60

// timer
var timer = 0;

// Number of questions correct
var numCorrect = 0;

// Total number of high scores
var numberHighScores = 10;

// Get an array in local storage that is parsed OR an empty array
var highScoreArr = JSON.parse(localStorage.getItem("highScoreArr")) || [];

// Create a questions array
var questions = [
    {
        questionText: 'What does the push() method do?',
        choice1: "Adds any content between the parenthesis to the end of the specified array", 
        choice2: "Removes the last element of an array and returns that element", 
        choice3: "Removes the first element from an array and returns that removed element", 
        choice4: "Adds any content between the parenthesis to the start of the specified array",
        answer: "Adds any content between the parenthesis to the end of the specified array"
    },

    {
        questionText: 'What does the parseInt() function do?',
        choice1: "Converts a number to a JSON string", 
        choice2: "Converts a number to a string", 
        choice3: "Converts a string to a number", 
        choice4: "Converts a JSON string to a number",
        answer: "Converts a string to a number",
    },  
    
    {
        questionText: 'What is JavaScript responsible for on a webpage?',
        choice1: "The structure of the page", 
        choice2: "The design of the page", 
        choice3: "Version control", 
        choice4: "The behavior of the page",
        answer: "The behavior of the page",
    },  
    
    {
        questionText: 'How do you save array data to localStorage?',
        choice1: "setItem()", 
        choice2:"getItem", 
        choice3:"JSON.stringify(array)", 
        choice4: "Both A and C",
        answer: "Both A and C",
    },  
    
    {
        questionText: 'What are the components of .addEventListener and what order do they go in?',
        choice1: "(eventListener, eventHandler)", 
        choice2: "(eventHandler, eventListener)", 
        choice3: "(event, function())", 
        choice4: "(event, eventListener)",
        answer: "(eventListener, eventHandler)",
    },
];

// questions index
var i = 0;

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

            // run game over function
            gameOver;
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
    // display the question
    questionNumber.textContent = questions[i].questionText;
    // display choices on the DOM
    choiceButton1.textContent = questions[i].choice1;
    choiceButton2.textContent = questions[i].choice2;
    choiceButton3.textContent = questions[i].choice3;
    choiceButton4.textContent = questions[i].choice4;
};

// Check to see if the game should end or keep going
function continueGame() {
    if (i === (questions.length - 1)) {
        clearInterval(timer);
        // Hide the questions
        quizBox.classList.add('hide');
        resultsBox.classList.remove('hide');
        resultsBox.classList.add('resultsMessage');
        resultsBox.textContent = 'The quiz is done! Lets see how you did!';
        gameEnds();
    } else {
        i++;
        showQuestions();
    }
}

// set the text content of the unordered list to the answer
function showAnswers(event) {
    // keep track of user answers
    var userAnswer = event.target.textContent;
    var correctAnswer = questions[i].answer;

    // for each question
    if (event.target.matches('button')) {

        // if the answer is correct
        if (userAnswer === correctAnswer) {
            // say correct
             explanationEl.textContent = 'Correct!'

            // add to the number correct
            numCorrect++;

            // continue the game
            continueGame();
        }
        // if the answer is wrong or blank
        else {
            // say what the correct answer is
             explanationEl.textContent = 'Incorrect the correct answer is: ' + correctAnswer;
            
            // subtract 2 seconds for each incorrect answer
            timeLeft -= 2;

            // subtract one from the number correct 
            numCorrect - 1;

            continueGame();

        }
        
    }
}

// Add data to local storage
function saveScore() {
    var scoreObject = {
        initials: initials.value,
        score: numCorrect
    };

    highScoreArr.push(scoreObject);

    highScoreArr.sort(function (a,b) {
        // b.score - a.score puts the scores in reverse
        return b.score - a.score;
    });

    if (highScoreArr.length > 10) {
        highScoreArr.pop();
        localStorage.setItem('highScoreArr', JSON.stringify(highScoreArr));
    }
    else {
        localStorage.setItem('highScoreArr', JSON.stringify(highScoreArr));
    }
    window.location.href="highscores.html" 
};

console.log(saveScore);
// takes you to the game over card
function gameOver() {
    // clears the time 
    clearInterval(timer);
    // hides the questions card
    quizBox.classList.add('hide');
    // display the gameOver card
    resultsBox.classList.remove('hide');
};

// END OF THE GAME  and display the scorecard
function gameEnds() {
    highScoreBox.classList.remove('hide');
    playersFinalScoreDisplay.textContent = numCorrect + ' out of ' + questions.length;
};

// EVENT LISTENERS
// Run startGame when the start button is clicked
startButton.addEventListener('click', startGame);

// Run gameEnds when the show results button is clicked
resultsButton.addEventListener('click', gameEnds);

// when the user answers a question, continue the game
questionButtons.addEventListener('click', showAnswers);

// when user clicks submit after entering initials, save to high score
highScoreButton.addEventListener('click', saveScore)



