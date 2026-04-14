let questions = [];
let current = 0;
let score = 0;

fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  let q = questions[current];
  document.getElementById("question").innerText = q.question;

  let choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.choices.forEach(choice => {
    let btn = document.createElement("button");
    btn.innerText = choice;
    btn.onclick = () => checkAnswer(choice);
    choicesDiv.appendChild(btn);
  });
}

function checkAnswer(choice) {
  if (choice === questions[current].answer) {
    score++;
    alert("Correct!");
  } else {
    alert("Wrong!");
  }
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    document.body.innerHTML = `<h1>Score: ${score}</h1>`;
  }
}
