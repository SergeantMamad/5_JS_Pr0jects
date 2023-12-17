import arrayShuffle from "https://cdn.jsdelivr.net/npm/array-shuffle@3.0.0/+esm";
let checboxa = document.querySelector(".radioa");
let checboxb = document.querySelector(".radiob");
let checboxc = document.querySelector(".radioc");
let checboxd = document.querySelector(".radiod");
let optiona = document.querySelector(".optiona");
let optionb = document.querySelector(".optionb");
let optionc = document.querySelector(".optionc");
let optiond = document.querySelector(".optiond");
let title = document.querySelector(".title");
let submit = document.querySelector(".submit");
let category = localStorage.getItem("cat");
let optContainer = document.querySelector(".quiz");
let respdata;
let current = 0;
let score = 0;
let lastcorrect = false;
if (category == "geography") {
  respdata = await fetch(
    "https://opentdb.com/api.php?amount=5&category=22&type=multiple"
  )
    .then((Response) => Response.json())
    .then((responseJson) => {
      return responseJson;
    });
} else if (category == "history") {
  respdata = await fetch(
    "https://opentdb.com/api.php?amount=5&category=23&type=multiple"
  )
    .then((Response) => Response.json())
    .then((responseJson) => {
      return responseJson;
    });
} else if (category == "sports") {
  respdata = await fetch(
    "https://opentdb.com/api.php?amount=5&category=21&type=multiple"
  )
    .then((Response) => Response.json())
    .then((responseJson) => {
      return responseJson;
    });
} else if (category == "videogame") {
  respdata = await fetch(
    "https://opentdb.com/api.php?amount=5&category=15&type=multiple"
  )
    .then((Response) => Response.json())
    .then((responseJson) => {
      return responseJson;
    });
} else if (category == "random") {
  respdata = await fetch(
    "https://opentdb.com/api.php?amount=5&type=multiple"
  )
    .then((Response) => Response.json())
    .then((responseJson) => {
      return responseJson;
    });
}


loadQuiz(respdata);

function loadQuiz(data) {
  if (current == 5) {
    let name = localStorage.getItem("name");
    return (optContainer.innerHTML = `Conguratulations ${name} The Quiz is finished, Your Score is ${score}`);
  }
  let currentquiz = data.results[current];
  let answers = arrayShuffle([
    ...currentquiz.incorrect_answers,
    currentquiz.correct_answer,
  ]);
  title.innerHTML = currentquiz.question;
  checboxa.value = answers[0];
  checboxb.value = answers[1];
  checboxc.value = answers[2];
  checboxd.value = answers[3];
  optiona.innerHTML = answers[0];
  optionb.innerHTML = answers[1];
  optionc.innerHTML = answers[2];
  optiond.innerHTML = answers[3];
}

submit.addEventListener("click", () => {
  let uAnswer = document.querySelector('input[type="radio"]:checked');
  checkAnswer(uAnswer, respdata);
});

function checkAnswer(value, data) {
  if (current < data.results.length) {
    if (value.value == data.results[current].correct_answer) {
      score++;
      alert("Your Answer Was Correct");
      value.checked = false;
      current++;
      return loadQuiz(data);
    } else {
      alert(
        `Your Answer Was Wrong, The Correct Answer is : ${data.results[current].correct_answer}`
      );
      value.checked = false;
      current++;
      return loadQuiz(data);
    }
  }
}
