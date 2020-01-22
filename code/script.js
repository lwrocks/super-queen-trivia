(function() {
  // Functions
  function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
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
        `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
    console.log(answerContainers);
    
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
        answerContainers[questionNumber].style.color = "green";
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    showFinalResult();
  }

  function showFinalResult(resultsContainer) {
    let img = document.createElement("img");
    let gifDiv = document.getElementsByClassName("quiz-container")[0];
    // Show GIF based on final results of quiz
    if (resultsContainer > 6) {
      img.setAttribute(
        "src",
        "https://media.giphy.com/media/1wrB59GXD8LclkvLQa/giphy.gif"
      );
      console.log("You're a winner baby!");
    } else {
      img.setAttribute(
        "src",
        "https://media.giphy.com/media/cDeEUTOFzXiz6/giphy.gif"
      );
      console.log("Sashay Away");
    }
    gifDiv.appendChild(img);

    // Hide quiz text while GIF is displayed
    document.querySelector("#quiz").style.visibility = "hidden";

    setTimeout(() => {
      gifDiv.removeChild(img);
      document.querySelector("#quiz").style.visibility = "visible";
    }, 4000);
  }

  // GIFs
  function showGif(questionIndex) {
    let img = document.createElement("img");
    let gifDiv = document.getElementsByClassName("quiz-container")[0];

    const answerContainers = quizContainer.querySelectorAll(".answers");
    const answerContainer = answerContainers[questionIndex];
    const selector = `input[name=question${questionIndex}]:checked`;

    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    const correctAnswer = myQuestions[questionIndex].correctAnswer;
    
    // Is the answer right or wrong?
    if (correctAnswer === userAnswer) {
      img.setAttribute(
        "src",
        "https://media.giphy.com/media/yble1suOGfHJ6/giphy.gif"
      );

      console.log("correct");
    } else {
      img.setAttribute(
        "src",
        "https://media.giphy.com/media/3E0Nnz21fcv0XbBXYF/giphy.gif"
      );
      console.log("incorrect");
    }
    gifDiv.appendChild(img);

    // Hide quiz text while GIF is displayed
    document.querySelector("#quiz").style.visibility = "hidden";

    setTimeout(() => {
      gifDiv.removeChild(img);
      document.querySelector("#quiz").style.visibility = "visible";
    }, 3000);
  }

  function showSlide(n) {
    //show text
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showGif(currentSlide);

    setTimeout(() => {
      showSlide(currentSlide + 1);
    }, 4000);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "When did the first season of RuPaul’s Drag Race premiere?",
      answers: {
        a: "2006",
        b: "2007",
        c: "2012",
        d: "2009"
      },
      correctAnswer: "d"
    },

    {
      question: "Who was the first winner of Drag Race All-Stars?",
      answers: {
        a: "Pandora Boxx",
        b: "Chad Michaels",
        c: "Manila Luzon",
        d: "Raven"
      },
      correctAnswer: "b"
    },

    {
      question: "When did Michelle Visage first become a judge on RuPaul’s Drag Race?",
      answers: {
        a: "Season 1",
        b: "Season 5",
        c: "Season 3",
        d: "Season 6"
      },
      correctAnswer: "c"
    },

    {
      question: "What city is Season 10 winner Aquaria from?",
      answers: {
        a: "Wichita, KS",
        b: "New York, NY",
        c: "Los Angeles, CA",
        d: "Gary, IN"
      },
      correctAnswer: "b"
    },

    {
      question: "Which queen holds the dubious honor of being the only contestant to ever be disqualified from RPDR?",
      answers: {
        a: "Willam",
        b: "Bianca Del Rio",
        c: "Alexis Mateo",
        d: "Pearl"
      },
      correctAnswer: "a"
    },

    {
      question: "Which celebrity HAS NOT been a guest judge on RPDR?",
      answers: {
        a: "Jonathan Van Ness (JVN)",
        b: "Nicole Richie",
        c: "Geri Halliwell",
        d: "Lizzo"
      },
      correctAnswer: "a"
    },

    {
      question: "Ru’s catchphrase to the contestants is, “Gentlemen, start your engines...and may the best _____ win!",
      answers: {
        a: "Boy",
        b: "Woman",
        c: "Drag Queen",
        d: "Beauty"
      },
      correctAnswer: "b"
    },

    {
      question: "Who was the winner of the inaugural series of RuPaul’s Drag Race UK?",
      answers: {
        a: "Gothy Kendall",
        b: "Sum Ting Wong",
        c: "The Vivienne",
        d: "Divina de Campo"
      },
      correctAnswer: "c"
    },

    {
      question: "Where is Season 6 contestant Courtney Act from?",
      answers: {
        a: "London, England",
        b: "Chicago, USA",
        c: "Brisbane, Australia",
        d: "Berlin, Germany"
      },
      correctAnswer: "c"
    },

    {
      question: "How many times has Shangela competed for the Drag Race crown?",
      answers: {
        a: "3",
        b: "1",
        c: "4",
        d: "2"
      },
      correctAnswer: "a"
    }
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
