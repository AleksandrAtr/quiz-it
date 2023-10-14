const questions = [
    {
        question : "What's your name?",
        answers : [
            {
                answer : "Aleks",
                correct : false
            },
            {
                answer : "Serge",
                correct : true
            }
        ]
    }
]


function printQandAnsw() {
    for ( let i=0; i < questions.length; i++) {
        console.log(questions[i].question) 
        
        for (item in questions[i].answers) {
            let seq = item * 1 + 1;
            console.log(seq + '. ' + questions[i].answers[item].answer);  
    }
    }
}

    


