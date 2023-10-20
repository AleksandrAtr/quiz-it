//import quiz questions
import { questions } from './questions.js';

const start = 'Start';
const next = 'Next';
const header = document.getElementById('header');
const cdmIntro = document.getElementById('cdm-intro');
const cdmQuizContainer = document.getElementById('cdm-quiz-container');
const body = document.getElementById('body');

const numOfQuestions = questions.length;
const startButton = document.getElementById('start-btn');
const quizQuestion = document.getElementById('cdm-question');
const quizAnswers = document.getElementById('cdm-answers');
const answerButtons = document.getElementsByClassName('btn');
const quizExitButton = document.getElementById('exit-btn');
const quizNextButton = document.getElementById('next-btn');
const scoreWindow = document.getElementById('score');


let questionNumber;
let questionIndex;
let score;

quizExitButton.addEventListener('click', () => {
    window.location.href="../index.html" 
});
quizNextButton.addEventListener('click', () => {
    buttonsControl(next);
});
startButton.addEventListener('click', startQuiz);


function resetQuestionContainer() {
    quizQuestion.innerHTML = "";
    quizAnswers.innerHTML = "";
}

function showQuestion() {
    quizNextButton.style.display = 'none';
    resetQuestionContainer();
    // declare a constant with assigned value from the questions array (imported from module)
    const currentQuestion = questions[questionIndex]['question'];
    // create a template for the html question element
    const questionTemplate = `<h2>${questionNumber}. ${currentQuestion}</h2>`;
    // update html question element with current question
    quizQuestion.innerHTML = questionTemplate;


    // declare a constant with assigned value from the questions/answers arrays (imported from module)
    const currentAnswer = questions[questionIndex]['answers'];
    // create possible answers for the current question
    for (const index in currentAnswer) {
        let answer = currentAnswer[index]['answer'];
        let isCorrect = currentAnswer[index]['correct'];
        //console.log("I am 'correct' in the currentAnswer - ", correct)
        const answerTemplate = `
            <button correct="${isCorrect}" class='btn'>${answer}</button>
        `;
        quizAnswers.innerHTML += answerTemplate;
    }
    applyEventListener();
}

function applyEventListener() {
    const answerButtons = document.getElementsByClassName('btn');
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener('click', checkAnswer);
    }
}

function checkAnswer(event) {
    // disable answer buttons 
    const array = Array.prototype.slice.call(answerButtons);
    array.forEach(button => {button.disabled = true;})

    const selectedBtn = event.target;
    const isCorrectAnswer = selectedBtn.getAttribute('correct') === 'true';
    
    if (isCorrectAnswer) {
        selectedBtn.classList.add('correct');
        score += 1;
        showScore(score)
    } else {
        selectedBtn.classList.add('incorrect');
        quizAnswers.querySelector('[correct="true"]').classList.add('correct');
    }

    questionIndex += 1;
    questionNumber += 1;
    quizNextButton.style.display = 'block';
}


function showScore(score) {
    scoreWindow.innerHTML = `
        Score ${score}/${numOfQuestions}
    `
}

function scoreResult(score, numOfQuestions) {
    let resultFeedback = '';
    const results = Math.round((score/numOfQuestions)*100);
    if (results === 100) {
        resultFeedback = 'Congratulations on your outstanding achievement! Scoring 100% in the quiz is a testament to your dedication and knowledge. Keep up the excellent work!'
    } else if (results >= 70 && results < 100) {
        resultFeedback = "Congratulations on completing the quiz! You're doing great, and your effort is commendable. To improve even further, consider reviewing the material in the near future."
    } else {
        resultFeedback = "Great job on completing the quiz! It's the first step to excelling yourself. As you scored less than 70%, you should revisit the material as soon as possible to reinforce your regulations understanding. Keep up the good work!"
    }
    return resultFeedback;
}

function showResult() {
    quizNextButton.style.display = 'none';
    resetQuestionContainer();
    let addFeedback = scoreResult(score, numOfQuestions);
    quizAnswers.innerHTML = "Quiz completed. You scored " + score + " out of " + numOfQuestions + ".\n" + addFeedback;
}

function buttonsControl(type) {
    if (type == start) {
        header.style.display = 'none';
        cdmIntro.style.display = 'none';
        
        showQuestion();
        cdmQuizContainer.style.display = "block";
        body.classList.add("body-image");
    } else {
        if (questionIndex < (numOfQuestions)) {
            showQuestion();
        } else { 
            showResult()
            startButton.innerHTML = 'Start Again';
            startButton.style.display = 'block'
            startButton.removeEventListener('click', () => {buttonsControl(next)})
            startButton.addEventListener('click', startQuiz);
        }
    }
}

function startQuiz() {
    questionIndex = 0;
    score = 0;
    questionNumber = questionIndex + 1;
    showScore(score);
    quizNextButton.style.display = 'none';
    buttonsControl(start);
}




