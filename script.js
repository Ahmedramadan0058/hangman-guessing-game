const wordDisplay = document.querySelector(".word-display");

const keyboardDiv = document.querySelector(".keyboard");

const hangmanImage = document.querySelector(".hangman-box img");

const guessesText = document.querySelector(".guesses-text b");

const gameModal = document.querySelector(".game-modal");

const playAgainBtn = document.querySelector(".play-again");

const timerDisplay = document.querySelector(".timer");


const codingQuiz = [

  { word: "variable", hint: "A placeholder for a value." },

  { word: "function", hint: "A block of code that performs a specific task." },

  { word: "loop", hint: "A programming structure that repeats a sequence of instructions until a specific condition is met." },

  { word: "array", hint: "A data structure that stores a collection of elements." },

  { word: "boolean", hint: "A data type that can have one of two values, true or false." },

  { word: "conditional", hint: "A statement that executes a block of code if a specified condition is true." },

  { word: "parameter", hint: "A variable in a method definition." },

  { word: "algorithm", hint: "A step-by-step procedure or formula for solving a problem." },

  { word: "debugging", hint: "The process of finding and fixing errors in code." },

  { word: "syntax", hint: "The rules that govern the structure of statements in a programming language." },

];


let currentWord, correctLetters, wrongGuessCount, timerInterval;

const maxGuesses = 6;

const gameTimeLimit = 30;


const resetGame = () => {

  correctLetters = [];

  wrongGuessCount = 0;

  hangmanImage.src = "https://media.geeksforgeeks.org/wp-content/uploads/202 40215173028/0.png";

  gameModal.style.display = "none";

  clearInterval(timerInterval);

  startTimer(gameTimeLimit);

  selectRandomWord();

  updateDisplay();

};


const selectRandomWord = () => {

  const randomIndex = Math.floor(Math.random() * codingQuiz.length);

  currentWord = codingQuiz[randomIndex].word;

  document.querySelector(".hint-text b").textContent = codingQuiz[randomIndex].hint;

};


const updateDisplay = () => {

  wordDisplay.innerHTML = "";

  currentWord.split("").forEach((letter) => {

    const li = document.createElement("li");

    li.textContent = correctLetters.includes(letter) ? letter : "_";

    wordDisplay.appendChild(li);

  });

  guessesText.textContent = `${wrongGuessCount} / ${maxGuesses}`;

  checkGameStatus();

};


const checkGameStatus = () => {

  if (wrongGuessCount >= maxGuesses) {

    gameOver(false);

  } else if (currentWord.split("").every((letter) => correctLetters.includes(letter))) {

    gameOver(true);

  }

};


const gameOver = (won) => {

  clearInterval(timerInterval);

  gameModal.style.display = "block";

  gameModal.querySelector("h4").textContent = won ? "You Win!" : "Game Over!";

  gameModal.querySelector("p").textContent = `The correct word was: ${currentWord}`;

};


const handleGuess = (letter) => {

  if (currentWord.includes(letter)) {

    correctLetters.push(letter);

  } else {

    wrongGuessCount++;

    hangmanImage.src = `https://media.geeksforgeeks.org/wp-content/uploads/20240215173028/${wrongGuessCount}.png`;

  }

  updateDisplay();

};


const startTimer = (duration) => {

  let timeLeft = duration;

  timerDisplay.textContent = `Time left: ${timeLeft}`;

  timerInterval = setInterval(() => {

    timeLeft--;

    timerDisplay.textContent = `Time left: ${timeLeft}`;

    if (timeLeft <= 0) {

      clearInterval(timerInterval);

      gameOver(false);

    }

  }, 1000);

};


playAgainBtn.addEventListener("click", resetGame);

document.addEventListener("keydown", (event) => {

  const letter = event.key.toLowerCase();

  if (letter >= 'a' && letter <= 'z' && !correctLetters.includes(letter) && wrongGuessCount < maxGuesses) {

    handleGuess(letter);

  }

});


// Initialize the game

resetGame();
