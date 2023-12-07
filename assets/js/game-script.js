// jshint esversion: 6
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

let unsuccessfulAttempts = 0;
let consecutiveMatches = 0;

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();

    const allCards = document.querySelectorAll(".memory-card");
    const matchedCards = document.querySelectorAll(".memory-card.flip");

    if (allCards.length === matchedCards.length) {
      stopTimer();
      openCongratulationsModal();
    } else {
      displayFeedbackMessage("Match found! Keep going!", 1000); // Adjust duration as needed

      // Check for three consecutive matches
      consecutiveMatches++;
      if (consecutiveMatches === 3) {
        displayFeedbackMessage("The King is getting worried!", 1000);
        consecutiveMatches = 0; // Reset the counter after displaying the special message
      }
    }

    // Reset the counter when a match is found
    unsuccessfulAttempts = 0;
  } else {
    // This is for timer-based checking
    lockBoard = true; // prevent further card flips until the comparison is done
    setTimeout(() => {
      unflipCards();
      lockBoard = false; // Reset the lockBoard only after the delay
    }, 1200);

    // Increment the counter for unsuccessful attempts
    unsuccessfulAttempts++;
    consecutiveMatches = 0; // Reset consecutiveMatches counter for non-matching attempts

    // Display the special message when the counter reaches three
    if (unsuccessfulAttempts === 3) {
      displayFeedbackMessage("The Kingdom Stands Strong!", 1000);
      // Reset the counter after displaying the special message
      unsuccessfulAttempts = 0;
    } else {
      // Display the standard "No match. Try again." message for unsuccessful attempts
      displayFeedbackMessage("No match. Try again.", 1000);
    }
  }
}


function displayFeedbackMessage(message) {
  const feedbackMessageElement = document.getElementById("feedback-message");
  feedbackMessageElement.textContent = message;

  feedbackMessageElement.classList.add("show-feedback-message");

  // After a certain duration, remove the feedback message and the added class
  setTimeout(() => {
    feedbackMessageElement.textContent = "";
    feedbackMessageElement.classList.remove("show-feedback-message");
  }, 6000);
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

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

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
  const closeModalButton = document.getElementById(
    "close-congratulations-modal"
  );
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
