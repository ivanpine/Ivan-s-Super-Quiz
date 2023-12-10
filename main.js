import { questions } from "./questions.js";

'use strict';

const playNowButton = document.querySelector(".btn-play");
const nextButton = document.querySelector(".btn-next");
const playAgainButton = document.querySelector(".btn-again");
const screen1 = document.querySelector(".screen1-welcome");
const screen2 = document.querySelector(".screen2-questions");
const screen3 = document.querySelector(".screen3-score");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons")
const resultElement = document.getElementById("result");

let score = 0;
let curentQuestionIndex = 0;

class App {
    
    constructor() {
        playNowButton.addEventListener('click', this.handlePlayNowButton.bind(this));
        nextButton.addEventListener('click', this.handleNextButton.bind(this));
        playAgainButton.addEventListener('click', this.handlePlayAgainButton);
    }

    handlePlayNowButton() {
        screen1.style.display = "none";
        screen2.style.display = "block";

        this.showQuestion();
    }

    handleNextButton() {
        curentQuestionIndex++;

        if (curentQuestionIndex < questions.length) {
            this.showQuestion();
        }

        else {
            this.showScore();
        }
    }

    handlePlayAgainButton() {
        location.reload();
    }
    
    handleAnswerButton(e) {
        const selectedAnswerButton = e.target;
        const answerIsCorrect = selectedAnswerButton.dataset.correct;
        
        if(answerIsCorrect) {
            selectedAnswerButton.classList.add("correct");
            score++;
        }

        else {
            selectedAnswerButton.classList.add("incorrect");
        }

        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct) {
                button.classList.add("correct");
            }
            button.disabled = true;
        });

        nextButton.style.display = "block";

    }

    showQuestion() {
        this.reset();
        nextButton.style.display = "none";

        let currentQuestion = questions[curentQuestionIndex];
        questionElement.innerHTML = currentQuestion.question;

        currentQuestion.answers.forEach((answer) => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add('btn-answer');
            answerButtons.appendChild(button);

            if(answer.isCorrect) {
                button.dataset.correct = answer.isCorrect;
            }

            button.addEventListener('click', this.handleAnswerButton);
        });
    }

    showScore() {
        screen2.style.display = "none";
        screen3.style.display = "block";

        resultElement.textContent = `You scored ${score} out of ${questions.length}!`;
    }

    reset() {
        while(answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }
}

const app = new App();