//import quiz questions
import { questions } from './questions.js';

const start = 'Start';
const next = 'Next';
const questionsLength = questions.length;
let menuButton = document.getElementById('menu-btn');
let quizQuestion = document.getElementById('cdm-question');
let quizAnswers = document.getElementById('cdm-answers');
const answerButtons = document.getElementsByClassName('btn');

let questionIndex = 0;
let score = 0;

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
    // declare selected button with event taget value
    const selectedBtn = event.target;
    const correctAnswer = selectedBtn.getAttribute('correct') === 'true';
    if (correctAnswer) {
        // selectedBtn.classList.add('correct');
        score += 1;
    } else {
        selectedBtn.classList.add('incorrect');
    }

    const array = Array.prototype.slice.call(answerButtons);
    array.forEach(button => {
        if (button.getAttribute('correct') === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    })
    questionIndex += 1;
    // console.log(questionIndex);
    menuButton.style.display = 'block';
    // debugger;
    menuButton.removeEventListener('click', startQuiz);
    menuButton.addEventListener('click', () => {handleMenuButton(next)});
}

function showResult() {
    resetQuestionContainer();
    
    quizAnswers.innerHTML = "Quiz completed";
}

function handleMenuButton(type) {
    // you can use ternarry here
    if (type == start) {
        // resetQuestionContainer();
        showQuestion();
        document.getElementById('cdm-quiz-container').style.display = "block";
        menuButton.innerHTML = 'Next';
    } else {
        if (questionIndex < (questionsLength)) {
            showQuestion();
        } else { showResult()}
        // (questionIndex < questionsLength) ? showQuestion : showResult;
    }
}



function startQuiz() {
    handleMenuButton(start);
}



