// GLOBAL VARIABLES
// Tie buttons into index.html
var startButton = document.querySelector('.start');
var newQuestionButton = document.querySelector('.question')
var answerButton = document.querySelector('.answer');
var scoreButton = document.querySelector('.score');

// Tie boxes into index.html
var header = document.querySelector('header');
var startBox = document.getElementById('start-box');
var quizBox = document.getElementById('quiz-box');
var answerBox = document.getElementById('results')
var endBox = document.getElementById('end-box');

// Reference unordered list with class of 'question list' and create list item
var questionListEl = document.getElementById('question-list');

// Counter starts counting down from 60 seconds
var timeLeft = 60

// Create a questions array
var questions = [
    {
        questionText: 'QUESTION 1: What does the push() method do?',
        choices: {
            a: 'Adds any content between the parenthesis to the end of the specified array', 
            b: 'Removes the last element of an array and returns that element', 
            c: 'Removes the first element from an array and returns that removed element', 
            d: 'Adds any content between the parenthesis to the start of the specified array'},
        answer: 'a'
    },

    {
        questionText: 'QUESTION 2: What does the parseInt() function do?',
        choices: {
            a:'Converts a number to a JSON string', 
            b: 'Converts a number to a string', 
            c: 'Converts a string to a number', 
            d: 'Converts a JSON string to a number'
        },
        answer: 'c'
    },  
    
    {
        questionText: 'QUESTION 3: What is JavaScript responsible for on a webpage?',
        choices: {
            a:'The structure of the page', 
            b: 'The design of the page', 
            c: 'Version control', 
            d: 'The behavior of the page'
        },
        answer: 'd'
    },  
    
    {
        questionText: 'QUESTION 4: How do you save array data to localStorage?',
        choices: {
            a:'setItem()', 
            b: 'getItem', 
            c: 'JSON.stringify(array)', 
            d: 'Both A and C'
        },
        answer: 'd'
    },  
    
    {
        questionText: 'QUESTION 5: What are the components of .addEventListener and what order do they go in?',
        choices: {
            a:'(eventListener, eventHandler)', 
            b: '(eventHandler, eventListener)', 
            c: '(event, function())', 
            d: '(event, eventListener)'
        },
        answer: 'a'
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
    // variable to store the answer choices
    var answerChoices = questions.choices;
    
   // for each question...
	for(var i=0; i<questions.length; i++){
        
        // reset the answer choices
        answerChoices = [];
        
        // for each available answer
        for (var letter in questions[i].choices){
            // add HTML radio button
            answerChoices.push(
                '<label>'
					+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
					+ letter + ': '
					+ questions[i].choices[letter]
				+ '</label>' + '</br>'
			);
        }

        // add this question and its answers to the output
        output.push(
            '<div class="question">' + questions[i].questionText + '</div>'
			+ '<div class="options">' + answerChoices.join('') + '</div>'
        );
    }

    // combine output list into one string of HTML
    questionListEl.innerHTML = output.join('');
};

// set the text content of the unordered list to the answer
function showAnswers() {
    // gather answer containers from the quiz
    var answerContainer = quizBox.querySelectorAll('.options')

    // keep track of user answers
    var userAnswer = '';
    var numCorrect = 0;

    // for each question
    for (i = 0; i < questions.length; i++) {
        // find selected answer
        userAnswer = (answerContainer[i].querySelector('input[name=question'+i+']:checked') || {}).value;

        // if the answer is correct
        if (userAnswer === questions[i].answer) {
            // say correct
            questionListEl.textContent = 'Correct!'

            // add to the number correct
            numCorrect ++;

            // color the answers green
            answerContainer[i].style.color = 'lightgreen';
        }
        // if the answer is wrong or blank
        else {
            // say what the correct answer is
            questionListEl.textContent = 'Incorrect, the correct answer is ' + questions.answer;
            
            // color the answers red
            answerContainer[i].style.color = 'red';

            // subtract 2 seconds for each incorrect answer
            timeLeft -= 2;

        }
    }

    // show number of correct answers out of total
    endBox.innerHTML = numCorrect + ' out of ' + questions.length;
}

// EVENT LISTENERS
// Run startGame when the start button is clicked
startButton.addEventListener('click', startGame);

// Run showAnswer when the submit answer button is clicked
answerButton.addEventListener('click', showAnswers)

