let isSoundPlaying = false;

function updateButtonDisplay() {
  if (isSoundPlaying) {
    volumeOn.classList.remove("mute");
    volumeOff.classList.add("mute"); // Add the "mute" class here
  } else {
    volumeOn.classList.add("mute");
    volumeOff.classList.remove("mute"); // Remove the "mute" class here
  }
}

function toggleSound() {
  const soundtrack = document.getElementById("soundtrack");

  if (isSoundPlaying) {
    // If sound is playing, pause it
    soundtrack.pause();
  } else {
    // If sound is not playing, play it
    soundtrack.play();
  }

  // Toggle the sound playing state
  isSoundPlaying = !isSoundPlaying;

  /* Update button display based on the current sound state */
  updateButtonDisplay();
}

// Attach event listeners to the volume buttons
var volumeOn = document.getElementById("volumeon");
var volumeOff = document.getElementById("volumeoff");

// Initial display setup
updateButtonDisplay();

volumeOn.addEventListener("click", toggleSound);
volumeOff.addEventListener("click", toggleSound); // No need to handle mute separately here
