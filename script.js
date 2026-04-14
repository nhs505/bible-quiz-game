let questions = [];
let current = 0;
let score = 0;

window.onload = function () {
  fetch('questions.json')
    .then(res => res.json())
    .then(data => {
      questions = data;
      showQuestion();
    })
    .catch(err => {
      document.getElementById("question").innerText =
        "Error loading questions.json";
      console.log(err);
    });
};

function showQuestion() {
  if (!questions.length) return;

  let q = questions[current];

  document.getElementById("question").innerText = q.question;

  let choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.choices.forEach(choice => {
    let btn = document.createElement("button");
    btn.innerText = choice;

    btn.onclick = function () {
      if (choice === q.answer) {
        score++;
        alert("Correct!");
      } else {
        alert("Wrong!");
      }
    };

    choicesDiv.appendChild(btn);
  });
}

function nextQuestion() {
  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    document.body.innerHTML =
      `<h1>Score: ${score}/${questions.length}</h1>`;
  }
}
