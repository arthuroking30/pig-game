'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let scorePlayer = document.querySelector(`#score--0`);
let currentScorePlayer = document.getElementById(`current--0`);
let currentName = document.querySelector(`#name--0`);
let player = document.querySelector('.player--0');

let dice = document.querySelector('.dice');
let currentPlayer = 0;
let currentScore = 0;
let score = 0;
let finished = false;

dice.classList.add('hidden');

function switchPlayer() {
  player.classList.toggle('player--active');
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player = document.querySelector(`.player--${currentPlayer}`);
  scorePlayer = document.querySelector(`#score--${currentPlayer}`);
  currentScorePlayer = document.getElementById(`current--${currentPlayer}`);
  currentName = document.querySelector(`#name--${currentPlayer}`);
  player.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (!finished) {
    let randGen = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${randGen}.png`;
    dice.classList.remove('hidden');

    if (randGen !== 1) {
      currentScore += randGen;
      currentScorePlayer.textContent = currentScore;
    } else {
      currentScore = 0;
      currentScorePlayer.textContent = currentScore;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  score = Number(scorePlayer.textContent) + currentScore;
  scorePlayer.textContent = score;
  currentScore = 0;
  currentScorePlayer.textContent = currentScore;
  if (score > 20) {
    finished = true;
    currentName.textContent = 'WINNER';
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    dice.classList.add('hidden');
  } else switchPlayer();
});

btnNew.addEventListener('click', function () {
  player.classList.remove('player--winner');
  finished = false;
  currentScore = 0;
  currentScorePlayer.textContent = currentScore;
  score = 0;
  scorePlayer.textContent = score;
  currentName.textContent = `Player ${currentPlayer + 1}`;
  switchPlayer();
  currentScorePlayer.textContent = currentScore;
  scorePlayer.textContent = score;
});
