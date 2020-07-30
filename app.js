//Ge DOM Elements
const wordEl = document.getElementById('word');
const wronglettersEl = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playBtn = document.getElementById('play-button');
const notification = document.getElementById('notification-container');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard', 'javscript', 'API'];
let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = ['w', 'i', 'z', 'a', 'r', 'd'];
const wrongLetter = [];

//Show the hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
    .split('')
    .map(letter => `
    <span class="letter">${correctLetters.includes(letter) ? (letter): ''}
    </span>`
    ).join('')
  }
  `;
  console.log(wordEl.innerText); //this will o/p w i and z vertically as there is a new line character which we will remove using RegEx
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  console.log(innerWord);

  if (innerWord === selectedWord) {
    finalMessage.innerText = `Congratulations! You won! 😃`;
    popup.style.display = 'flex';
  }
}

//Update the wrong letters
function updateWrongLettersEl() {
  console.log('Update Wrong')
}

//Show notification

function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show')
  }, 3000)
}

//Keydown letter press
window.addEventListener('keydown', (e) => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    console.log(e.key);
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord()
      } else {
        showNotification()
      }
    } else {
      if (!wrongLetter.includes(letter)) {
        wrongLetter.push(letter)

        updateWrongLettersEl
      } else {
        showNotification()
      }
    }
  }
});

displayWord();