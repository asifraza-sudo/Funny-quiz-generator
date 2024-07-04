const startButton_s = document.getElementById('start-btn');
const nextButton_s = document.getElementById('next-btn');
const questionContainer_s = document.getElementById('question-container');
const questionElement_s = document.getElementById('question');
const answerButtons_s = document.getElementById('answer-buttons');

let shuffledQuestions_s, currentQuestionIndex_s;

const questions_s = [
    {
        question: "What's the best thing about Switzerland?",
        answers: [
            { text: "I don't know, but the flag is a big plus.", correct: true },
            { text: "The cheese!", correct: false },
            { text: "The mountains!", correct: false },
            { text: "The watches!", correct: false }
        ]
    },
    {
        question: "Why did the scarecrow win an award?",
        answers: [
            { text: "Because he was outstanding in his field.", correct: true },
            { text: "Because he was scary.", correct: false },
            { text: "Because he had a brain.", correct: false },
            { text: "Because he was stylish.", correct: false }
        ]
    },
    {
        question: "How does a penguin build its house?",
        answers: [
            { text: "Igloos it together.", correct: true },
            { text: "With ice blocks.", correct: false },
            { text: "It doesn't build houses.", correct: false },
            { text: "With snow.", correct: false }
        ]
    }
];

startButton_s.addEventListener('click', startQuiz_s);
nextButton_s.addEventListener('click', () => {
    currentQuestionIndex_s++;
    setNextQuestion_s();
});

function startQuiz_s() {
    startButton_s.classList.add('hide');
    shuffledQuestions_s = questions_s.sort(() => Math.random() - 0.5);
    currentQuestionIndex_s = 0;
    questionContainer_s.classList.remove('hide');
    setNextQuestion_s();
}

function setNextQuestion_s() {
    resetState_s();
    showQuestion_s(shuffledQuestions_s[currentQuestionIndex_s]);
}

function showQuestion_s(question_s) {
    questionElement_s.innerText = question_s.question;
    question_s.answers.forEach(answer_s => {
        const button_s = document.createElement('button');
        button_s.innerText = answer_s.text;
        button_s.classList.add('btn');
        if (answer_s.correct) {
            button_s.dataset.correct = answer_s.correct;
        }
        button_s.addEventListener('click', selectAnswer_s);
        answerButtons_s.appendChild(button_s);
    });
}

function resetState_s() {
    clearStatusClass_s(document.body);
    nextButton_s.classList.add('hide');
    while (answerButtons_s.firstChild) {
        answerButtons_s.removeChild(answerButtons_s.firstChild);
    }
}

function selectAnswer_s(e) {
    const selectedButton_s = e.target;
    const correct_s = selectedButton_s.dataset.correct;
    setStatusClass_s(document.body, correct_s);
    Array.from(answerButtons_s.children).forEach(button_s => {
        setStatusClass_s(button_s, button_s.dataset.correct);
    });
    if (shuffledQuestions_s.length > currentQuestionIndex_s + 1) {
        nextButton_s.classList.remove('hide');
    } else {
        startButton_s.innerText = 'Restart';
        startButton_s.classList.remove('hide');
    }
}

function setStatusClass_s(element_s, correct_s) {
    clearStatusClass_s(element_s);
    if (correct_s) {
        element_s.classList.add('correct');
    } else {
        element_s.classList.add('wrong');
    }
}

function clearStatusClass_s(element_s) {
    element_s.classList.remove('correct');
    element_s.classList.remove('wrong');
}
