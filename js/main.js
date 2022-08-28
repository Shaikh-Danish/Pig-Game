"use strict";

const player1El = document.querySelector(".player__0");
const player2El = document.querySelector(".player__1");
const current1El = document.getElementById("current__0");
const current2El = document.getElementById("current__1");
const score1El = document.getElementById("score__0");
const score2El = document.getElementById("score__1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn__roll");
const btnHold = document.querySelector(".btn__hold");
const btnNew = document.querySelector(".btn__new-game");

let currentScore, activePlayer, playerScores, playing;

//Starting Conditions
const init = function () {
				currentScore = 0;
				activePlayer = 0;
				playerScores = [0, 0];
				playing = true;
				
				current1El.textContent = 0;
				current2El.textContent = 0;			
				score1El.textContent = 0;
				score2El.textContent = 0;

				diceEl.classList.add("hidden");			 player1El.classList.remove("player__winner");
			 player2El.classList.remove("player__winner");
			 player1El.classList.add("player__active");
			 player2El.classList.remove("player__active");
}
init();

const switchPlayer = function () {
				document.getElementById(`current__${activePlayer}`).textContent = 0;
				currentScore = 0;
				activePlayer = activePlayer === 0 ? 1 : 0;
								
player1El.classList.toggle("player__active");
player2El.classList.toggle("player__active");
}

btnRoll.addEventListener("click", function () {
				if (playing) {
								//Generate a random dice number
								const dice = Math.trunc(Math.random() * 6) + 1;
				
								//Display the Dice
								diceEl.classList.remove("hidden");
								diceEl.src = `img/dice-${dice}.png`;
				
								//check for dice 1
								if (dice !== 1) {
												//add dice roll to active players current score
												currentScore += dice;
												document.getElementById(`current__${activePlayer}`).textContent = currentScore;
								}
								else {
												switchPlayer();
								}
				}
});


btnHold.addEventListener("click", function () {
				if (playing) {
								//add current score to the active players score
								playerScores[activePlayer] += currentScore;
								document.getElementById(`score__${activePlayer}`).textContent = playerScores[activePlayer];
				
								if (playerScores[activePlayer] >= 20) {
												playing = false;
												document.querySelector(`.player__${activePlayer}`).classList.add("player__winner");
												document.querySelector(`.player__${activePlayer}`).classList.remove("player__active");
												diceEl.classList.add("hidden");
								}
								else {
												switchPlayer();
								}
				}
});

btnNew.addEventListener("click", init);