//import quiz questions
import {questions} from './questions.js';

// start quize f
    // to statrt the quiz we need
        //show question
        //show answers
        //show question number
        //show total questions

// get question f
// swow answers f
// reset answers f
// get global variable questions index
// get global variable questions index

const startQuizBtn = document.getElementById('menu-btn');
let quizQuestion = document.getElementById('cdm-question');
let quizAnswers = document.getElementById('cdm-answers');


let questionIndex = 0;
let score = 0;

function resetQuestionContainer() {
    quizQuestion.innerHTML = "";
    quizAnswers.innerHTML = "";
}


startQuizBtn.addEventListener('click', startQuiz);

function startQuiz() {
    document.getElementById('cdm-quiz-container').style.display = "block";
    startQuizBtn.innerHTML = 'Next';
    resetQuestionContainer();
    showQuestion();
    // console.log(quizQuestion);
    // console.log(quizAnswers);

}


function showQuestion() {
    // declare a constant with assigned value from the questions array (imported from module)
    const currentQuestion = questions[questionIndex]['question']; 
    // create a template for the html question element
    const questionTemplate = `<h2>${currentQuestion}</h2>`;
    // update html question element with current question
    quizQuestion.innerHTML = questionTemplate;


    // declare a constant with assigned value from the questions array (imported from module)
    const currentAnswer = questions[questionIndex]['answers'];
    for (const value in currentAnswer){
        let answer = currentAnswer[value]['answer'];
        const answerTemplate = `<button class='btn'>${answer}</button>`;
        quizAnswers.innerHTML += answerTemplate;
    }   
}






