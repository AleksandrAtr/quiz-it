//import quiz questions
import { questions } from './questions.js';


let questionIndex;
let score;
const start = 'Start';
const next = 'Next';
const header = document.getElementById('header');
const cdmIntro = document.getElementById('cdm-intro');
const cdmQuizContainer = document.getElementById('cdm-quiz-container');
const body = document.getElementById('body');


const questionsLength = questions.length;
let menuButton = document.getElementById('menu-btn');
let quizQuestion = document.getElementById('cdm-question');
let quizAnswers = document.getElementById('cdm-answers');
const answerButtons = document.getElementsByClassName('btn');
const quizExitButton = document.getElementById('exit-btn');
const quizNextButton = document.getElementById('next-btn');



quizExitButton.addEventListener('click', () => {
    window.location.href="../index.html" 
});
quizNextButton.addEventListener('click', () => {
    handleMenuButton(next);
});
menuButton.addEventListener('click', startQuiz);


function resetQuestionContainer() {
    quizNextButton.style.display = 'none';
    quizQuestion.innerHTML = "";
    quizAnswers.innerHTML = "";
}

function showQuestion() {
    resetQuestionContainer();
    // declare a constant with assigned value from the questions array (imported from module)
    const currentQuestion = questions[questionIndex]['question'];
    // create a template for the html question element
    const questionTemplate = `<h2>${currentQuestion}</h2>`;
    // update html question element with current question
    quizQuestion.innerHTML = questionTemplate;


    // declare a constant with assigned value from the questions/answers arrays (imported from module)
    const currentAnswer = questions[questionIndex]['answers'];
    // create possible answers for the current question
    for (const value in currentAnswer) {
        let answer = currentAnswer[value]['answer'];
        let isCorrect = currentAnswer[value]['correct'];
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
    } else {
        selectedBtn.classList.add('incorrect');
        quizAnswers.querySelector('[correct="true"]').classList.add('correct');
    }

    questionIndex += 1;
    // quizNextButton.disabled = false;
    quizNextButton.style.display = 'block';
}

function showResult() {
    quizNextButton.style.display = 'none';
    resetQuestionContainer();
    quizAnswers.innerHTML = "Quiz completed. You scored " + score + " out of " + questionsLength;
}

function handleMenuButton(type) {
    // quizNextButton.disabled = true;
    if (type == start) {
        header.style.display = 'none';
        cdmIntro.style.display = 'none';
        
        showQuestion();
        cdmQuizContainer.style.display = "block";
        body.classList.add("body-image");
        

    } else {
        if (questionIndex < (questionsLength)) {
            showQuestion();
        } else { 
            showResult()
            menuButton.innerHTML = 'Start Again';
            menuButton.style.display = 'block'
            menuButton.removeEventListener('click', () => {handleMenuButton(next)})
            menuButton.addEventListener('click', startQuiz);
        }
    }
}

function startQuiz() {
    questionIndex = 0;
    score = 0;
    quizNextButton.style.display = 'none';
    handleMenuButton(start);
}



