// set default guessing range limits
let rangeLoEnd = 1
let rangeHiEnd = 100

// generate a random number between 1-100
let secretNumber = Math.floor(Math.random() * rangeHiEnd) + rangeLoEnd;

var rangeFeedback = document.getElementById('range-feedback');
var guessFeedback = document.getElementById('guess-feedback');
var winFeedback = document.getElementById('result-feedback');

var rangeButton = document.getElementById('range-submit');
var guessButton = document.getElementById('guess-submit');
var clearButton = document.getElementById('clear');
var resetButton = document.getElementById('reset');

rangeButton.addEventListener("click", setRange);
guessButton.addEventListener("click", validateInput);
clearButton.addEventListener("click", clearGuess);
resetButton.addEventListener("click", resetGame);

var guessField = document.getElementById('user-guess');
guessField.addEventListener("keyup", enableClear);

// In all cases below the function keyword is used instead of arrow notation
// This is for readability since it is my first JS program

// user can reset guessing range
function setRange() {
  let loEntry = parseInt(document.getElementById('range-low-end').value);
  let hiEntry = parseInt(document.getElementById('range-high-end').value);

  if ( isNaN(loEntry) || isNaN(hiEntry) ) {
    alert(`Oops, make sure the range is numbers!`);
  } else if (loEntry >= hiEntry) {
    alert(`Oops, starting number must be lower than ending number!`)
  } else {
    rangeLoEnd = loEntry;
    rangeHiEnd = hiEntry;
    resetGame(rangeLoEnd, rangeHiEnd);
    enableReset();
  }
}

function validateInput() {
  const x = guessField.value;
  if (x == "cheat") {
    guessFeedback.innerHTML =
    `Decided to cheat, huh? OK, the answer is ${secretNumber}.`;
    guessField.value = '';
    enableReset();
  } else if (isNaN(x)) {
    guessField.value = '';
    alert
    (`Oops, that's not a number. Try a guess between ${rangeLoEnd}-${rangeHiEnd}!`);
  } else if (x < rangeLoEnd || x > rangeHiEnd) {
    guessField.value = '';
    alert
    (`Oops! Your guess was not between ${rangeLoEnd}-${rangeHiEnd}, try again!`);
  } else
  evaluateGuess();
  enableReset();
}

// the user enters a guess
// evaluate the guess
// display feedback
function evaluateGuess() {
  let userGuess = parseInt(guessField.value);
  winFeedback.innerHTML = ''
  // the guess is compared to the secret to see if it's too high, too low, or a match
  // display the guess and whether it's too high, too low, or match
  if (userGuess === secretNumber) {
    let challengeRangeHiEnd = rangeHiEnd + 10;
    let challengeRangeLoEnd = rangeLoEnd - 10;
    resetGame(challengeRangeLoEnd, challengeRangeHiEnd);
    winFeedback.innerHTML =
    `BOOM. Correct guess, you win! You clearly need a new challenge.
    Your guessing range is now ${rangeLoEnd} - ${rangeHiEnd}.`;
  } else if (userGuess > secretNumber) {
    guessFeedback.innerHTML = `You guessed ${userGuess}. That is too high.`;
  } else if (userGuess < secretNumber) {
    guessFeedback.innerHTML = `You guessed ${userGuess}. That is too low.`;
  } else {
    guessFeedback.innerHTML = `Oops, something went wrong. Please refresh page.`;
  }
}

function clearGuess() {
  guessField.value = '';
  clearButton.disabled=true;
}

function resetGame(newRangeLoEnd = 1, newRangeHiEnd = 100) {
  if (newRangeLoEnd == "[object MouseEvent]") {
    newRangeLoEnd = 1;
  }
  rangeLoEnd = newRangeLoEnd
  rangeHiEnd = newRangeHiEnd
  // clear the "new challenge" result  if this reset comes from reset button instead of win condition
  if (newRangeLoEnd == 1 && newRangeLoEnd == 100) {
    winFeedback.innerHTML = '';
  }
  // reset the feedback informing user of current range
  rangeFeedback.innerHTML =
  `Guess a number between ${rangeLoEnd} and ${rangeHiEnd}...`

   // reset secret number and all other UI
  secretNumber = Math.floor(Math.random() * rangeHiEnd) + rangeLoEnd;
  guessFeedback.innerHTML = 'Make your first guess below:';
  winFeedback.innerHTML = '';
  guessField.value = '';
  document.getElementById('range-low-end').value = '';
  document.getElementById('range-high-end').value = '';
  clearButton.disabled=true;
  resetButton.disabled=true;
}

function enableClear() {
  if (guessField.value == '') {
    clearButton.disabled=true;
  } else {
    clearButton.disabled=false;
  }
}

function enableReset() {
  resetButton.disabled=false;
}
