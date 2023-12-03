const startButton = document.getElementById("start-button");

// Add a class for initial styles (opacity: 0, pointer-events: none)
startButton.classList.add("hidden");

// After a delay of 8000 milliseconds (8 seconds)
setTimeout(function () {
    // Remove the class to update styles (opacity: 1, pointer-events: auto)
    startButton.classList.remove("hidden");
    // Add a class for initial styles (opacity: 1, transition: opacity 2s ease;)
    startButton.classList.add("fade-in");
  }, 8000);


  const cards = document.querySelectorAll('.memory-card');

  function flipCard() {
    this.classList.toggle('flip');
  }

  cards.forEach(card => card.addEventListener('click', flipCard));