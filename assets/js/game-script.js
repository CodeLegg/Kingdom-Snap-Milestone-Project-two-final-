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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//INFO MODAL SCRIPT

const infoButton = document.getElementById("infobutton");
const infoModal = document.getElementById("infoModal");
const closeModal = document.getElementById("closemodal");

// Show the modal when the info button is clicked
infoButton.addEventListener("click", () => {
  infoModal.classList.add("show-modal");
});

// Hide the modal if the user clicks outside of it
window.addEventListener("click", (event) => {
  if (event.target === infoModal) {
    infoModal.classList.remove("show-modal");
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ... (Your existing code)

function openCongratulationsModal() {
  const modal = document.getElementById("congratulations-modal");
  const modalTime = document.getElementById("modal-time");
  const playerNameInput = document.getElementById("playerName");
  const submitButton = document.getElementById("submitTime");

  // Set the modal time content
  modalTime.textContent = `${minutes} minutes and ${seconds} seconds`;

  // Display the modal
  modal.classList.add("open");

  // Handle the submit button click
  submitButton.addEventListener("click", function () {
    const playerName = playerNameInput.value.trim();

    if (playerName !== "") {
      // Save data to local storage
      saveToLocalStorage(playerName, { minutes, seconds });

      // Navigate to leaderboard.html
      window.location.href = "leaderboard.html";
    } else {
      // Display an error or prompt the user to enter a name
      alert("Please enter your name.");
    }
  });

  // Close the modal when the close button is clicked
  const closeModalButton = document.getElementById("close-congratulations-modal");
  closeModalButton.addEventListener("click", function () {
    modal.classList.remove("open");
  });
}

// Function to save data to local storage
function saveToLocalStorage(playerName, timeData) {
  // Retrieve existing data or initialize an empty array
  const leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];

  // Add the new entry
  leaderboardData.push({ playerName, time: timeData });

  // Sort the leaderboard based on time (you may adjust the sorting logic)
  leaderboardData.sort((a, b) => {
    const timeA = a.time.minutes * 60 + a.time.seconds;
    const timeB = b.time.minutes * 60 + b.time.seconds;
    return timeA - timeB;
  });

  // Save the updated data back to local storage
  localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
}

// ... (Your existing code)

