import scoreBoard from "./localStorage.js";
import { emojiFoods } from "./emoji-foods.js";
import { shuffleArray } from "./shuffleArray.js";

const startBtn = document.querySelector(".start-btn");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const btnClosePopup = document.getElementById("btn-close-popup");
const h4 = document.querySelector(".overlay .popup h4");

const template = document.querySelector("#template-card");
const board = document.querySelector(".board");
const scoreItem = document.querySelector(".score-board__item-score");
const timer = document.querySelector(".score-board__item-time");
const finishDisplay = document.querySelector(".finish-display");
const alta = document.querySelector("#alta");
const recogerDatoUser = document.getElementById("user");
const submitDatoUser = document.getElementById("submit");
const showGame = document.querySelectorAll(".container");
// console.log(showGame);

const flippedCards = [];
let scoreCounter = 0;
let totalTime = 0;
let timeInterval = null;
let user = "Date de alta";

const fragment = document.createDocumentFragment();

alta.addEventListener("click", () => {
  h4.textContent = "y juega al juego de memoria visual:";
    h4.style.color = "black";
  overlay.classList.add("active");
  popup.classList.add("active");  
});

startBtn.addEventListener("click", () => {
  if (user === "Date de alta") {
    overlay.classList.add("active");
    popup.classList.add("active");
    startBtn.textContent = "Start";    
  } else {
    resetGame();
    createBoard();
    timeInterval = setInterval(updateTime, 1000);
  }
});

submitDatoUser.addEventListener("click", () => {
  try {
    user = recogerDatoUser.value;
    if(!user || user === "" || user.length < 3) {
      throw new SyntaxError("Por favor, introduce un nombre de usuario válido con al menos 3 caracteres.")
    }
    overlay.classList.remove("active");
    popup.classList.remove("active");    
    checkUser();
    for(let i = 0; i < showGame.length; i++) {
      showGame[i].classList.add("active");
    }
  } catch(error) {
    h4.textContent = error.message;
    h4.style.color = "red";
    console.error("Nombre de usuario no válido: ", error);
  };
  // console.log(showGame);
});

function checkUser() {
  alta.innerHTML = `<a>${user}</a>`;
}

btnClosePopup.addEventListener("click", () => {
  overlay.classList.remove("active");
  popup.classList.remove("active");
});

board.addEventListener("click", flipCard);

function userName() {
  user = document.getElementById("user").value;
}

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
  scoreBoard.push(newUser);
  const scoreBoardSorted = sortScore(); 
   
  if (scoreBoardSorted.length > 5) {
    scoreBoard.pop();
    window.localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
  } else {
    window.localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
  }
}

function sortScore() {
  scoreBoard.sort((a, b) => {
    // return a.score - b.score;
    return a.score > b.score ? 1 : -1;
  });
  return scoreBoard;
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
  timer.textContent = `${totalTime}s`;
}




