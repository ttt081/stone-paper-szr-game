let gameEl = {
  stone: "stone",
  paper: "paper",
  scissor: "scissor",
};

let opponent = {
  user: "You",
  computer: "Computer",
};

let choice = {
  user: null,
  computer: null,
};

let winner = {
  user: 0,
  computer: 0,
  tie: 0,
};

let displayChoice = function () {
  document.querySelector(
    "#userChoice"
  ).textContent = `Your Choice: ${choice.user}`;
  document.querySelector(
    "#computerChoice"
  ).textContent = `Computer Choice: ${choice.computer}`;
};

function computerChoice() {
  let randomNumber = Math.floor(Math.random() * 3) + 1;
  if (randomNumber === 1) {
    return "stone";
  }
  if (randomNumber === 2) {
    return "paper";
  }
  if (randomNumber === 3) {
    return "scissor";
  }
}

//displayResult
document.querySelector("#stone").addEventListener("click", function () {
  choice.user = gameEl.stone;
  choice.computer = computerChoice();
  displayChoice();
  comparison();
});

document.querySelector("#paper").addEventListener("click", function () {
  choice.user = gameEl.paper;
  choice.computer = computerChoice();
  displayChoice();
  comparison();
});

document.querySelector("#scissor").addEventListener("click", function () {
  choice.user = gameEl.scissor;
  choice.computer = computerChoice();
  displayChoice();
  comparison();
});

//comparison
let comparison = function () {
  if (choice.user == gameEl.stone && choice.computer == gameEl.paper) {
    displayWinner.computer();
    winner.computer++;
  } else if (choice.user == gameEl.stone && choice.computer == gameEl.scissor) {
    displayWinner.user();
    winner.user++;
  } else if (choice.user == gameEl.paper && choice.computer == gameEl.scissor) {
    displayWinner.computer();
    winner.computer++;
  } else if (choice.user == gameEl.paper && choice.computer == gameEl.stone) {
    displayWinner.user();
    winner.user++;
  } else if (choice.user == gameEl.scissor && choice.computer == gameEl.paper) {
    displayWinner.user();
    winner.user++;
  } else if (choice.user == gameEl.scissor && choice.computer == gameEl.stone) {
    displayWinner.computer();
    winner.computer++;
  } else {
    displayWinner.tie();
    winner.tie++;
  }
  saveResult();
  winnerCounter();
};

//displayWinner
let displayWinner = {
  user: function () {
    document.querySelector("#result").textContent = `Winner: ${opponent.user}!`;
  },
  computer: function () {
    document.querySelector(
      "#result"
    ).textContent = `Winner: ${opponent.computer}!`;
  },
  tie: function () {
    document.querySelector("#result").textContent = `Match tie!`;
  },
};

//saveResult
function saveResult() {
  localStorage.setItem("gameResult", JSON.stringify(winner));
}

//winnerCounter
let winnerCounter = function () {
  document.querySelector("#userScore").textContent = `${winner.user}`;
  document.querySelector("#computerScore").textContent = `${winner.computer}`;
  document.querySelector("#tieScore").textContent = `${winner.tie}`;
};

//displayRecord
let savedRecord = JSON.parse(localStorage.getItem("gameResult"));

if (savedRecord) {
  winner = savedRecord;
  winnerCounter();
}

//resetValue
document.querySelector("#resetButton").addEventListener("click", function () {
  choice = { user: null, computer: null };
  displayChoice();

  document.querySelector("#result").textContent = `Result`;

  localStorage.removeItem("gameResult");
  winner = { user: 0, computer: 0, tie: 0 };
  winnerCounter();
});
