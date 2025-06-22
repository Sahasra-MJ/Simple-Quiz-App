const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers:[
            {text:"Shark",correct: false},
            {text:"Blue whale",correct: true},
            {text:"Elephant",correct: false},
            {text:"Giraffe",correct: false},
        ]
    },
    {
        question: "Which is smallest continent in the world?",
        answers:[
            {text:"Asia",correct: false},
            {text:"Australia",correct: true},
            {text:"Arctic",correct: false},
            {text:"Africa",correct: false},
        ]
    },
    {
        question: "Who is known as father of computer?",
        answers:[
            {text:"Charles Babbage",correct: true},
            {text:"Alan Turing",correct: false},
            {text:"Steve Jobs",correct: false},
            {text:"Tim Berners-Lee",correct: false},
        ]
    },
    {
        question: "How many continents are there in earth?",
        answers:[
            {text:"5",correct: false},
            {text:"6",correct: false},
            {text:"7",correct: true},
            {text:"8",correct: false},
        ]
    },
    {
        question: "Which planet is known as Red Planet ?",
        answers:[
            {text:"Mars",correct: true},
            {text:"Venus",correct: false},
            {text:"Jupiter",correct: false},
            {text:"Earth",correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerbutton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answers=>{
        const button=document.createElement("button");
        button.innerHTML=answers.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answers.correct){
            button.dataset.correct=answers.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild)
    }
}

function selectAnswer(e){
    const selectedbtn=e.target;
    const iscorrect=selectedbtn.dataset.correct ==="true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
