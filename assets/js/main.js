//import quiz questions
import { questions } from './questions.js';

const start = 'Start';
const next = 'Next';
const questionsLength = questions.length;
let menuButton = document.getElementById('menu-btn');
let quizQuestion = document.getElementById('cdm-question');
let quizAnswers = document.getElementById('cdm-answers');
const answerButtons = document.getElementsByClassName('btn');

let questionIndex;
let score;

menuButton.addEventListener('click', startQuiz);

function resetQuestionContainer() {
    menuButton.style.display = 'none';
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
    menuButton.style.display = 'block';

    menuButton.removeEventListener('click', startQuiz);
    menuButton.addEventListener('click', () => {handleMenuButton(next)});
}

function showResult() {
    resetQuestionContainer();
    quizAnswers.innerHTML = "Quiz completed. You scored " + score + " out of " + questionsLength;
}

function handleMenuButton(type) {
    if (type == start) {
        showQuestion();
        document.getElementById('cdm-quiz-container').style.display = "block";
        menuButton.innerHTML = 'Next';
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
    handleMenuButton(start);
}



