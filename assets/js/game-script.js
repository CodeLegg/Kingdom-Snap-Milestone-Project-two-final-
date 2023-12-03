const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    startTimerIfNotRunning(); // Start the timer only if it's not already running

    return;
  }
  // second click
  secondCard = this;

  checkForMatch(); // No need to pass a parameter
}

function startTimerIfNotRunning() {
  if (!timer) {
    startTimer();
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();

    const allCards = document.querySelectorAll(".memory-card");
    const matchedCards = document.querySelectorAll(".memory-card.flip");

    if (allCards.length === matchedCards.length) {
      stopTimer();
      openCongratulationsModal();
      // Additional actions when all cards are matched
    }
  } else {
    // This is for timer-based checking
    lockBoard = true; // prevent further card flips until the comparison is done
    setTimeout(() => {
      unflipCards();
      lockBoard = false; // Reset the lockBoard only after the delay
    }, 800);
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  firstCard.classList.remove("flip");
  secondCard.classList.remove("flip");

  resetBoard();
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach((card) => card.addEventListener("click", flipCard));

let timer;
let seconds = 0;
let minutes = 0;

function initializeTimerDisplay() {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

window.addEventListener("load", initializeTimerDisplay);

function startTimer() {
  timer = setInterval(function () {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  updateTimerDisplay(); // Ensure the timer display is updated when stopping
}

function updateTimerDisplay() {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
