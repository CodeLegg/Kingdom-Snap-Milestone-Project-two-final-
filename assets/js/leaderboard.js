// jshint esversion: 6
function saveToLeaderboard(playerName, time) {
  // Retrieve existing data from local storage or initialize with an empty array
  const leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];

  // Add the new entry to the array
  leaderboardData.push({
    name: playerName,
    time: { minutes: time.minutes, seconds: time.seconds },
  });

  // Save the updated array back to local storage
  localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
}

// Function to populate the table with data
function populateLeaderboard() {
  const tableBody = document.querySelector("#leaderboard-table tbody");

  // Clear existing rows
  tableBody.innerHTML = "";

  // Retrieve data from local storage
  const leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];

  // Loop through the data and create table rows
  leaderboardData.forEach((entry) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const timeCell = document.createElement("td");

    nameCell.textContent = entry.playerName; // Fix: Access playerName property
    const formattedTime = formatTime(entry.time.minutes, entry.time.seconds);
    timeCell.textContent = formattedTime;

    row.appendChild(nameCell);
    row.appendChild(timeCell);

    

    tableBody.appendChild(row);
  });
}

// Function to format time as "X mins Y secs"
function formatTime(minutes, seconds) {
  return `${minutes} mins ${seconds} secs`;
}

// Call the function to initially populate the table
populateLeaderboard();
