'use strict';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
//Set element variable to ref to element DOM
const imgDice = $('.dice');
const rollBtn = $('.btn--roll');
const holdBtn = $('.btn--hold');
const newGameBtn = $('.btn--new');
const playerOne = $('.player--0');
const currentScoreOne = $('#current--0');
const totalScoreOne = $('#score--0');
const playerTwo = $('.player--1');
const currentScoreTwo = $('#current--1');
const totalScoreTwo = $('#score--1');
//Set unique attribute to use
const playerActive = `player--active`;
const playerWinner = `player--winner`;
const displayBlock = `block`;
const displayNone = `none`;
const maxScore = 100;
const maxNumber = 6;
const minNumber = 1;
let currentScore, scoreOne, scoreTwo, isPlayerOne, isWinner, firstTimeVisit;

const textAssign = (element, content) => {
  element.textContent = content;
};

function setDisplay(element, type) {
  element.style.display = type;
}

const removeClass = (element, typeRemove) => {
  element.classList.remove(typeRemove);
};
const addClass = (element, typeAdd) => {
  element.classList.add(typeAdd);
};
const setScore = (elementScore, elementCurrent, score, current) => {
  textAssign(elementScore, score);
  textAssign(elementCurrent, current);
};

const setPlayerWinner = (elementOne, elementTwo, actionActive, actionWinner) => {
  removeClass(elementOne, actionActive);
  addClass(elementOne, actionWinner);
  removeClass(elementTwo, actionActive);
};

const switchPlayer = (elementOne, elementTwo, className) => {
  removeClass(elementOne, className);
  addClass(elementTwo, className);
};
//Starting game
const init = function () {
  currentScore = 0;
  scoreOne = 0;
  scoreTwo = 0;
  isPlayerOne = true;
  isWinner = false;
  firstTimeVisit = false;
  setDisplay(imgDice, displayNone);
};

const setPlayerHold = (elementPlayerOne, elementPlayerTwo, elementScore, elementCurrentScore, score, current, actionActive, actionWinner) => {
  if (score >= maxScore) {
    score = maxScore;
    isWinner = true;
  }
  setScore(elementScore, elementCurrentScore, score, current);
  if (score < maxScore) switchPlayer(elementPlayerOne, elementPlayerTwo, actionActive);
  else setPlayerWinner(elementPlayerOne, elementPlayerTwo, actionActive, actionWinner);
};

function newGame() {
  newGameBtn.addEventListener('click', () => {
    init();
    if (playerOne.classList.contains(playerWinner)) removeClass(playerOne, playerWinner);
    if (playerTwo.classList.contains(playerWinner)) removeClass(playerTwo, playerWinner);
    if (!playerOne.classList.contains(playerActive)) addClass(playerOne, playerActive);
    if (playerTwo.classList.contains(playerActive)) removeClass(playerTwo, playerActive);
    setScore(totalScoreOne, currentScoreOne, scoreOne, currentScore);
    setScore(totalScoreTwo, currentScoreTwo, scoreTwo, currentScore);
  });
}

function roll() {
  rollBtn.addEventListener('click', () => {
    if (!firstTimeVisit) {
      setDisplay(imgDice, displayBlock);
      firstTimeVisit = !firstTimeVisit;
    }
    if (!isWinner) {
      const randomScore = Math.trunc(Math.random() * maxNumber) + minNumber;
      imgDice.src = `dice-${randomScore}.png`;
      currentScore = randomScore !== minNumber ? currentScore + randomScore : 0;

      isPlayerOne ? textAssign(currentScoreOne, currentScore) : textAssign(currentScoreTwo, currentScore);

      if (randomScore === minNumber) {
        isPlayerOne ? switchPlayer(playerOne, playerTwo, playerActive) : switchPlayer(playerTwo, playerOne, playerActive);
        isPlayerOne = !isPlayerOne;
      }
    }
  });
}

function hold() {
  holdBtn.addEventListener('click', () => {
    if (!isWinner) {
      isPlayerOne ? (scoreOne += currentScore) : (scoreTwo += currentScore);

      currentScore = 0;

      isPlayerOne ? setPlayerHold(playerOne, playerTwo, totalScoreOne, currentScoreOne, scoreOne, currentScore, playerActive, playerWinner) : setPlayerHold(playerTwo, playerOne, totalScoreTwo, currentScoreTwo, scoreTwo, currentScore, playerActive, playerWinner);

      isPlayerOne = !isPlayerOne;
    }
  });
}

function start() {
  init();
  newGame();
  roll();
  hold();
}

start();
