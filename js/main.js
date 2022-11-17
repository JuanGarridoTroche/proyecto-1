import scoreBoard from "./localStorage.js";
import { emojiFoods } from "./emoji-foods.js";
import { shuffleArray } from "./shuffleArray.js";

const startBtn = document.querySelector(".start-btn");
const template = document.querySelector("#template-card");
const board = document.querySelector(".board");
const scoreItem = document.querySelector(".score-board__item-score");
const timer = document.querySelector(".score-board__item-time");
const finishDisplay = document.querySelector(".finish-display");
const alta = document.querySelector("#alta");
// console.log(alta);

const flippedCards = [];
let scoreCounter = 0;
let totalTime = 0;
let timeInterval = null;
let user = "Date de alta";

const fragment = document.createDocumentFragment();

alta.addEventListener("click", () => {
  checkUser();
});

startBtn.addEventListener("click", () => {
  // console.log("click");
  if (user === "Date de alta") {
    checkUser();
  }
  resetGame();
  createBoard();
  timeInterval = setInterval(updateTime, 1000);
});

function checkUser() {
  user = prompt("Introduce un nombre de usuario: ");
  alta.innerHTML = `<a>${user}</a>`;
}

board.addEventListener("click", flipCard);

function resetGame() {
  board.innerHTML = "";
  clearInterval(timeInterval);
  totalTime = 0;
  timer.textContent = totalTime;
  scoreCounter = 0;
  scoreItem.textContent = scoreCounter;
  finishDisplay.classList.add("hide");
}

function createBoard() {
  const randomArray = createRandomArrayFromOther(emojiFoods);
  const arrayRandomWithMatches = [...randomArray, ...randomArray];
  const shuffledArray = shuffleArray(arrayRandomWithMatches);

  shuffledArray.forEach((emoji) => {
    const card = createCard(emoji);
    fragment.append(card);
  });

  board.append(fragment);
}

function createRandomArrayFromOther(arrayToCopy, maxLength = 8) {
  const clonedArray = [...arrayToCopy];
  const randomArray = [];
  for (let i = 0; i < maxLength; i++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length);
    const randomItem = clonedArray[randomIndex];
    randomArray.push(randomItem);
    clonedArray.splice(randomIndex, 1);
    // console.log(randomArray[i].emoji);
  }
  return randomArray;
}

function createCard(emojiData) {
  const { id, emoji } = emojiData;
  const card = template.content.cloneNode(true);
  card.querySelector(".card").dataset.identity = id;
  card.querySelector(".card__back").textContent = emoji;

  return card;
}

function flipCard(event) {
  const card = event.target.closest(".card");
  if (card && flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      checkIdentityMatch();
      finishGame();
      // console.log("2 cartas mostradas");
    }
  }
}

function finishGame() {
  const numberOfMatches = board.querySelectorAll(".match").length;
  if (numberOfMatches === 16) {
    finishDisplay.classList.remove("hide");
    saveScore();
    clearInterval(timeInterval);
  }
}

function saveScore() {
  const newUser = { name: user, score: scoreCounter, time: totalTime };
  console.log(scoreBoard[scoreBoard.length-1].score);
  console.log(scoreBoard);
  if(scoreBoard.length >= 5 && scoreCounter > scoreBoard[scoreBoard.length-1].score) {    
    scoreBoard.pop();
    scoreBoard.push(newUser);
    window.localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
  } else {
    scoreBoard.push(newUser);
    window.localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
  }
}

function checkIdentityMatch() {
  if (flippedCards[0].dataset.identity === flippedCards[1].dataset.identity) {
    flippedCards.forEach((card) => {
      card.classList.add("match");
    });
    flippedCards.length = 0;
  } else {
    setTimeout(() => {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
      });
      flippedCards.length = 0;
    }, 1000);
  }
  updateScoreCounter(1);
}

function updateScoreCounter(score) {
  scoreItem.textContent = scoreCounter += score;
}

function updateTime() {
  totalTime++;
  timer.textContent = totalTime;
}
