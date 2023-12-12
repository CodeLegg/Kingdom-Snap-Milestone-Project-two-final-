// jshint esversion: 6
const startButton = document.getElementById("start-button");
const Loading = document.getElementById("loading-text");
const Loaded = document.getElementById("loaded-text");

// Add a class for initial styles (opacity: 0, pointer-events: none)
startButton.classList.add("hidden");

Loaded.classList.add("hidden");

// After a delay of 8000 milliseconds (8 seconds)
setTimeout(function () {
    // Remove the class to update styles (opacity: 1, pointer-events: auto)
    Loading.classList.add("hidden");
}, 7000);

setTimeout(function () {
    // Remove the class to update styles (opacity: 1, pointer-events: auto)
    Loaded.classList.remove("hidden");
       // Add a class for initial styles (opacity: 1, transition: opacity 2s ease;)
       Loaded.classList.add("fade-in");
}, 7200);

  // After a delay of 8000 milliseconds (8 seconds)
setTimeout(function () {
    // Remove the class to update styles (opacity: 1, pointer-events: auto)
    startButton.classList.remove("hidden");
    // Add a class for initial styles (opacity: 1, transition: opacity 2s ease;)
    startButton.classList.add("fade-in");
  }, 8000);

