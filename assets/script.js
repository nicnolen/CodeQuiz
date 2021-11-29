// GLOBAL VARIABLES
// Tie buttons into index.html
var startButton = document.querySelector('.start');
var quizButton = document.querySelector('.answer');
var scoreButton = document.querySelector('.score');

// Tie boxes into index.html
var header = document.querySelector('header');
var startBox = document.getElementById('start-box');
var quizBox = document.getElementById('quiz-box');
var answerBox = document.getElementById('results')
var endBox = document.getElementById('end-box');

// reference unordered list with class of 'question list' and create list item
var questionListEl = document.getElementById('question-list');

 // counter starts counting down from 60 seconds
 var timeLeft = 60 

// Create a questions array
var questions = [
    {
        questionText: 'QUESTION 1: What does the push() method do?',
        choices: {a: 'adds any content between the parenthesis to the end of the specified array', 
                b: 'removes the last element of an array and returns that element', 
                c: 'removes the first element from an array and returns that removed element', 
                d: 'adds any content between the parenthesis to the start of the specified array'},
        answer: 'a'
    },

    {
        questionText: 'QUESTION 2: ',
        choices: {
            a:'', 
            b: '', 
            c: '', 
            d: ''
        },
        answer: 'c'
    },  
    
    {
        questionText: 'QUESTION 3:',
        choices: {
            a:'', 
            b: '', 
            c: '', 
            d: ''
        },
        answer: 'b'
    },  
    
    {
        questionText: 'QUESTION 4:',
        choices: {
            a:'', 
            b: '', 
            c: '', 
            d: ''
        },
        answer: 'a'
    },  {
        questionText: 'QUESTION 5:',
        choices: {
            a:'', 
            b: '', 
            c: '', 
            d: ''
        },
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
				+ '</label>'
			);
        }

        // add this question and its answers to the output
        output.push(
            '<div class="question">' + questions[i].questionText + '</div>'
			+ '<div class="answers">' + answerChoices.join('') + '</div>'
        );
    }

    // combine output list into one string of HTML
    questionListEl.innerHTML = output.join('');
};

// set the text content of the unordered list to the answer
function showAnswers() {
    // gather answer containers from the quiz
    var answerContainer = quizBox.querySelectorAll('.answers')

    // keep track of user answers
    var userAnswer = '';
    var numCorrect = 0;

    // for each question
    for (i = 0; i < questions.length; i++) {
        // find selected answer
        userAnswer = (answerContainer[i].querySelector('input[name=question'+i+']:checked') || {}).value;

        // if the answer is correct
        if (userAnswer === questions[i].answer) {
            // add to the number correct
            numCorrect ++;

            // color the answers green
            answerContainer[i].style.color = 'lightgreen';
        }
        // if the answer is wrong or blank
        else {
            // color the answers red
            answerContainer[i].style.color = 'red';

            // show correct answer
            answerContainer[i].innerHTML = 'The correct answer is ' + '<br>' + questions[i].answer;
            // subtract 2 from the timer

        }
    }

    // show number of correct answers out of total
    endBox.innerHTML = numCorrect + ' out of ' + questions.length;
}

// EVENT LISTENERS
// Run startGame when the start button is clicked
startButton.addEventListener('click', startGame);

// Run showAnswer when the submit answer button is clicked
quizButton.addEventListener('click', showAnswers)