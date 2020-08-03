//Ge DOM Elements
const wordEl = document.getElementById("word");
const wronglettersEl = document.getElementById("wrong-letters");
const popup = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const playBtn = document.getElementById("play-button");
const notification = document.getElementById("notification-container");
const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "application",
  "programming",
  "interface",
  "wizard",
  "javscript",
  "API",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = ["w", "i", "z", "a", "r", "d"];
const wrongLetters = [];

//Show the hidden word
function displayWord() {
  wordEl.innerHTML = `
      ${selectedWord
        .split("")
        .map(
          (letter) => `
      <span class="letter">${correctLetters.includes(letter) ? letter : ""}
      </span>`
        )
        .join("")}
    `;
  console.log(wordEl.innerText); //this will o/p w i and z vertically as there is a new line character which we will remove using RegEx
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  console.log(innerWord);

  if (innerWord === selectedWord) {
    finalMessage.innerText = `Congratulations! You won! 😃`;
    popup.style.display = "flex";
  }
}

//Update the wrong letters
function updateWrongLettersEl() {
  //Display Wrong Letters
  wronglettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p" : ""}
    ${wrongLetters.map((letter) => `<span>${letter} </span`)}
  `;
  //Draw the hangman parts for each wrong letter added
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //Check if game lost Game Lost/Over
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popup.style.display = "flex";
  }
}

//Show notification

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

//Keydown letter press
window.addEventListener("keydown", (e) => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    console.log(e.key);
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

//Restart game and play again
playBtn.addEventListener("click", () => {
  //Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  ///choose a new word for the game from the words array
  selectedWord = words[Math.floor(Math.random() * words.length)];

  ///display the new word for the game
  displayWord();

  //update/clear the wrong letters display element
  updateWrongLettersEl();

  //clear the popup
  popup.style.display = "none";
});
displayWord();
