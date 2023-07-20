const rulesButton = document.querySelectorAll('[data-rule-button]');
const gameMessage = document.querySelector('[data-message]');
const playerScoreMessage = document.querySelector('[data-player-score]');
const cpuScoreMessage = document.querySelector('[data-cpu-score]');

const cpuRules = ["paper", "rock", "scissors"];

let cpuScore = 0;
let playerScore = 0;

const gameRules = [
  {
    name: 'rock',
    strong: 'scissors',
    weak: 'paper'
  },
  {
    name: 'scissors',
    strong: 'paper',
    weak: 'rock'
  },
  {
    name: 'paper',
    strong: 'rock',
    weak: 'scissors'
  },
];

function renderMessage(playerGuess, cpuGuess, resultMessage) {
  gameMessage.innerText = `${playerGuess} & ${cpuGuess} = ${resultMessage}`
}

function renderPlayerScore() {
  playerScoreMessage.innerText = ++playerScore;
}

function renderCpuScore() {
  cpuScoreMessage.innerText = ++cpuScore;
}

function gameRuleAction(playerGuess, cpuGuess) {
  gameRules.forEach(gameRule => {
    if(gameRule.name === playerGuess) {
      if (gameRule.weak === cpuGuess) {
        renderMessage(gameRule.name, cpuGuess, 'Cpu Kazandı');
        renderCpuScore();
      }

      if (gameRule.strong === cpuGuess) {
        renderMessage(gameRule.name, cpuGuess, 'Player Kazandı');
        renderPlayerScore();
      }
    }
  });
}

function playedGame(playerGuess, cpuGuess) {
  // is spouses
  if (playerGuess === cpuGuess) {
    renderMessage(playerGuess, cpuGuess, 'Berabere Kaldınız.');
  }

  // Game Rules Action
  if (playerGuess !== cpuGuess) {
    gameRuleAction(playerGuess, cpuGuess);
  }
} 

function ButtonAction() {
  let cpuGuess = Math.floor(Math.random() * 3);
  console.log(cpuRules[cpuGuess].toLowerCase());
  playedGame(this.innerText.toLowerCase(), cpuRules[cpuGuess].toLowerCase());
} 

function actionGame() {
  rulesButton.forEach(ruleButton => {
    ruleButton.addEventListener('click', ButtonAction);
  });
}

actionGame();