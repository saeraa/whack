const score = document.querySelector("#score")
const timer = document.querySelector("#time-left")
const startBtn = document.querySelector("#btn-start")
const resetBtn = document.querySelector("#btn-reset")
const gameOver = document.querySelector("#game-over")

const squares = document.querySelectorAll(".square")
const goat = document.querySelector(".goat")

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

const CURRENT_TIME = 20;

let currentTime = CURRENT_TIME;
let result = 0;
let goatPosition;
let timerId = null;
let countDownTimerId = null;

function resetGame() {
  gameOver.style.display = "none";
  gameOver.textContent = null;
  startBtn.disabled = false;

  result = 0;
  currentTime = CURRENT_TIME;
  timerId = null;
  countDownTimerId = null;
  squares.forEach((square) => {
    square.removeEventListener("click", checkForMatch)
  })
}

function resetGoats() {
  squares.forEach(square => {
    square.classList.remove("goat")
  });
}

function randomSquare() {
  resetGoats()
  let randomPosition = Math.floor(Math.random() * squares.length)
  squares[randomPosition].classList.add("goat");
  goatPosition = randomPosition;
}

function checkForMatch(event) {
  if (event.target.id == goatPosition) {
    result++;
    score.textContent = result;
  }
}

function startGame() {
  startBtn.disabled = true;
  squares.forEach((square) => {
    square.addEventListener("click", checkForMatch)
  })

  timerId = setInterval(randomSquare, 700);
  countDownTimerId = setInterval(countDown, 1000);
}

function countDown() {

  if (currentTime === 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    gameOver.style.display = "block";
    gameOver.textContent = "Game over! Your final score is " + result
    resetGoats()
    return;
  }

  currentTime--;
  timer.textContent = currentTime;
}