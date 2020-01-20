const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz() {
    const outPut = [

    ];
    // For each question
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            // Store list of answer choices
            const answers = [

            ]
            // For each available answer 
            for (letter in currentQuestion.answers) {
                // Add an HTML radio button
                answers.push(
                    <label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                            ${letter}:
                            ${currentQuestion.answers[letter]}
                        </input>
                    </label>
                );
            }
            // Add the questions ans its answers to the output
            output.push(
                <div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>
            );
        }
    );
    
}

function showResults() {

}

// Display quiz right away
buildQuiz();

// On submit, show results
submitButton.addEventListener('click', showResults);

// Quiz Questions 
const quizQuestions = [
    {
        question: "When did the first season of RuPaul's Drag Race premiere?",
        answers: {
            a: "2006",
            b: "2007",
            c: "2012",
            d: "2009"
        },
        correctAnswer: "d"
    },

    {
        question: "Who was the first winner of Drag Race All Stars?",
        answers: {
            a: "Pandora Boxx",
            b: "Chad Michaels",
            c: "Manila Luzon",
            d: "Raven",
        },
        correctAnswer: "b"
    },

    {
        question: "When did Michelle Visage first become a judge on RuPaul's Drag Race?",
        answers: {
            a: "Season 1",
            b: "Season 5",
            c: "Season 3",
            d: "Season 6",
        },
        correctAnswer: "c"
    },
]