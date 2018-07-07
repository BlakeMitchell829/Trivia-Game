//*Create Timer
var counter = 160;
var t;
var isTimerOn = false;

function countdown() {
    document.getElementById("txt").value = counter;
    counter--;
    t = setTimeout("countdown();", 1000);
}

function startMe() {
    if (!isTimerOn)
        isTimerOn = true;
    countdown();
}
//*Create trivia questions//
function buildQuiz() {
    // Store the HTML output
    const output = [];

    // for each question
    myQuestions.forEach((currentQuestion, questionNumber) => {
        // Store the list of answer choices
        const answers = [];

        // and for each available answer...
        for (letter in currentQuestion.answers) {
            // HTML radio button
            answers.push(
                `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
            );
        }

        // add this question and its answers to the output
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
        );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
}

function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[questionNumber].style.color = "lightgreen";
        } else {
            // if answer is wrong or blank
            // color the answers red
            answerContainers[questionNumber].style.color = "red";
        }
        isTimerOn = false;
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const myQuestions = [{
        question: "Which Artist cut a small portion of one ear after a heated argument with his fellow painter and probable jilted lover?",
        answers: {

            a: "Paul Gauguin",
            b: "Georges Seurat",
            c: "George Frederick Watts",
            d: "Vincent van Gogh"
        },
        correctAnswer: "d"
    },

    {
        question: "Which 20th century artist along with fellow artist Georges Braque created Cubism?",
        answers: {
            a: "Andy Warhol",
            b: "Jackson Pollock",
            c: "Pablo Picasso",
            d: "Salvador Dali"
        },
        correctAnswer: "c"
    },
    {
        question: "Who was one of the leading artists within the Impressionist movement; Impression, Sunrise is one of his most famous works?",
        answers: {
            a: "Henri Matisse",
            b: "Leonardo da Vinci",
            c: "Vincent van Gogh",
            d: "Claude Monet"
        },
        correctAnswer: "d"

    },
    {
        question: "Which artist along with Luis Bunuel created the short film Un Chien Andalou?",
        answers: {
            a: "Edward Hooper",
            b: "Paul Cezanne",
            c: "Andre Breton",
            d: "Salvador Dali"
        },
        correctAnswer: "d"
    },
    {
        question: "Which Spanish artist painted The Third of May 1808?",
        answers: {
            a: "Pablo Picasso",
            b: "El Greco",
            c: "Joan Miro",
            d: "Francisco Goya"
        },
        correctAnswer: "d"
    },
    {
        question: "Which artist was in a car accident where an iron handrail impaled them through their pelvis, fracturing the pelvic bone?",
        answers: {
            a: "Jose Clemente Orozco",
            b: "Rodolfo Morales",
            c: "Diego Rivera",
            d: "Frida Kahlo"
        },
        correctAnswer: "d"
    },
    {
        question: "Which artist along with Paul Signac developed Pointillism in 1886, branching from Impressionism?",
        answers: {
            a: "Henri Delavallee",
            b: "Maximilien Luce",
            c: "Charles Angrand",
            d: "Georges Seurat"
        },
        correctAnswer: "d"
    },
    {
        question: "Which artist painted the ceiling of the Sistine Chapel?",
        answers: {
            a: "Rafael",
            b: "Donatello",
            c: "Leonardo",
            d: "Michaelango"
        },
        correctAnswer: "d"
    },
    {
        question: "Which artist painted Girl with a Pearl Earring?",
        answers: {
            a: "Claude Monet",
            b: "Caravaggio",
            c: "Rembrant",
            d: "Johannes Vermeer"
        },
        correctAnswer: "d"
    },
    {
        question: "Who first sculpted David?",
        answers: {
            a: "Leanardo Di Vinci",
            b: "Rafael",
            c: "Michelangelo",
            d: "Donatello"
        },
        correctAnswer: "d"
    },
];

// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener("click", showResults);