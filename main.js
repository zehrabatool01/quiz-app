const questions = [
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java" },
      { text: "C" },
      { text: "Python" },
      { text: "javascript" },
    ],
    correct: "javascript",
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Central Style Sheets" },
      { text: "Cascading Style Sheets" },
      { text: "Cascading Simple Sheets" },
      { text: "Cars SUVs Sailboats" },
    ],
    correct: "Cascading Style Sheets",
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hypertext Markup Language" },
      { text: "Hypertext Markdown Language" },
      { text: "Hyperloop Machine Language" },
      { text: "Helicopters Terminals Motorboats Lamborginis" },
    ],
    correct: "Hypertext Markup Language",
  },
  {
    question: "What year was JavaScript launched?",
    answers: [
      { text: "1996" },
      { text: "1995" },
      { text: "1994" },
      { text: "none of the above" },
    ],
    correct: "1995",
  },
];

let questionEl = document.getElementById("questions");
let answerEl = document.getElementById("answer-btn");
let nextBtn = document.getElementById("next-btn");
let clock = document.getElementById("clock");

let min = 0;
let sec = 0;
setInterval(() => {
  if (sec < 60) {
    sec++;
  } else {
    min++;
    sec = 0;
  }
  clock.innerHTML = `${pad(min)} : ${pad(sec)}`;
}, 1000);

function pad(unit) {
  return ("0" + unit).length > 2 ? unit : "0" + unit;
}

let questionIndex = 0;
let score = 0;

function startQuiz() {
  nextBtn.style.display = "none";
  showQuestion();
  selectAnswer();
}

function showQuestion() {
  let currentQuestion = questions[questionIndex].question;
  let questionNo = questionIndex + 1;
  questionEl.innerHTML = questionNo + ". " + currentQuestion;

  let [first, second, third, fourth] = questions[questionIndex].answers;

  answerEl.innerHTML = ` 
            <button class="btn" id='btn1'>${first.text}</button>
            <button class="btn">${second.text}</button>
            <button class="btn">${third.text}</button>
            <button class="btn">${fourth.text}</button>`;
}

function selectAnswer() {
  let buttonValue = "";
  let str = questions[questionIndex].correct; //str contains correct answer
  // console.log(str)

  let buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      disableButton(".btn"); //disable all buttons after click

      buttonValue = event.target.textContent;
      console.log("Button value:", buttonValue);
      nextBtn.style.display = "block";

      if (buttonValue == str) {
        button.classList.add("correct");
        score += 10;
      } else if (buttonValue != str) {
        button.classList.add("incorrect");
        //show the correct answer
        document.querySelectorAll(".btn").forEach((all) => {
          if (all.textContent == str) {
            all.classList.add("correct");
          }
        });
      }
    });
  });
}

// when next button is clicked show net questio
nextBtn.addEventListener("click", () => {
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    console.log(questionIndex, "this is question index");
    if (questionIndex >= questions.length) {
      return;
    }
    startQuiz();
  } else {
    showScore();
  }
});

//disable all the buttons
function disableButton(id) {
  document.querySelectorAll(id).forEach((button) => {
    button.disabled = true;
  });
}

function startAgain() {
  location.href = "start.html";
}

function showScore() {
  document.getElementById("heading").innerHTML = `Result`;
  document.getElementById("quiz").innerHTML = `  
            <div class='result'>
                <h1 id='questions'>You scored ${score} out of ${
    questions.length * 10
  }</h1>
                <p>You ${score < 30 ? "Loose" : "Won"}</p>
                <p>Time Taken ${pad(min)} : ${pad(sec)} </p>
                <button id='playBtn' onclick="startAgain()" style='display:block'>PlayAgain</button>
            </div>
    `;
}

startQuiz();
