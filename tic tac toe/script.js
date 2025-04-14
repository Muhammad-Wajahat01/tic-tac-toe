console.log("Tic Tac Toe Game");

let turn = "X";
let isGameOver = false;

// Create an Audio object for the sound effect
const tingSound = new Audio("ting.mp3");

// Function to change turn
const changeTurn = () => (turn === "X" ? "O" : "X");

// Function to check if a box has X or O
const getBoxValue = (element) => {
  if (element.classList.contains("x-shape")) return "X";
  if (element.classList.contains("o-shape")) return "O";
  return "";
};

// Check for a win
const checkWin = () => {
  let boxtexts = document.getElementsByClassName("boxtext");
  let wins = [];

  // Horizontal 3-in-a-rows
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col <= 3; col++) {
      let idx = row * 6 + col;
      wins.push([idx, idx + 1, idx + 2]);
    }
  }

  // Vertical 3-in-a-rows
  for (let col = 0; col < 6; col++) {
    for (let row = 0; row <= 3; row++) {
      let idx = row * 6 + col;
      wins.push([idx, idx + 6, idx + 12]);
    }
  }

  // Diagonal ↘️
  for (let row = 0; row <= 3; row++) {
    for (let col = 0; col <= 3; col++) {
      let idx = row * 6 + col;
      wins.push([idx, idx + 7, idx + 14]);
    }
  }

  // Diagonal ↙️
  for (let row = 0; row <= 3; row++) {
    for (let col = 2; col < 6; col++) {
      let idx = row * 6 + col;
      wins.push([idx, idx + 5, idx + 10]);
    }
  }

  // Check all win conditions
  wins.forEach(e => {
    const a = boxtexts[e[0]];
    const b = boxtexts[e[1]];
    const c = boxtexts[e[2]];

    const valA = getBoxValue(a);
    const valB = getBoxValue(b);
    const valC = getBoxValue(c);

    if (valA && valA === valB && valB === valC) {
      document.querySelector(".info").innerText = valA + " Won!";
      isGameOver = true;
      document.querySelector(".imgbox").classList.add("show");

      // Highlight winning boxes
      e.forEach(i => {
        boxtexts[i].parentElement.classList.add("winning-box");
      });
    }
  });
};

// Handle player click
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (!boxtext.classList.contains("x-shape") && !boxtext.classList.contains("o-shape") && !isGameOver) {
      // Play the sound effect when a box is clicked
      tingSound.play();

      if (turn === "X") {
        boxtext.classList.add("x-shape");
      } else {
        boxtext.classList.add("o-shape");
      }

      checkWin();

      if (!isGameOver) {
        turn = changeTurn();
        document.querySelector(".info").innerText = "Turn for " + turn;
      }
    }
  });
});

// Reset button logic
document.getElementById("reset").addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach(element => {
    element.classList.remove("x-shape", "o-shape");
    element.parentElement.classList.remove("winning-box");
  });
  turn = "X";
  isGameOver = false;
  document.querySelector(".info").innerText = "Turn for " + turn;
  document.querySelector(".imgbox").classList.remove("show");
});
