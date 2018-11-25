// set default guessing range limits
// these three will be accessed and changed throughout the program, so use `let`
let rangeLoEnd = 1
let rangeHiEnd = 100

// generate a random number between 1-100
let secretNumber = Math.floor(Math.random() * rangeHiEnd) + rangeLoEnd;

// define html text fields that will display input to user
// use `var` for function scope
var rangeFeedback = document.getElementById('range-feedback');
var guessFeedback = document.getElementById('guess-feedback');
var winFeedback = document.getElementById('result-feedback');

// define html buttons that will later perform a JS funtion when clicked
// use `var` for function scope
var rangeButton = document.getElementById('range-submit');
var guessButton = document.getElementById('guess-submit');
var clearButton = document.getElementById('clear');
var resetButton = document.getElementById('reset');

// when user clicks range submit, perform JS function setRange
rangeButton.addEventListener("click", setRange);
// when user clicks guess submit, perform JS function validateInput
guessButton.addEventListener("click", validateInput);
// when user clicks clear, perform JS function clearGuess
clearButton.addEventListener("click", clearGuess);
// when user clicks reset, perform JS function resetGame
resetButton.addEventListener("click", resetGame);

// define html filed where user enters guess
// add JS method enableClear after user keys something into guess field
var guessField = document.getElementById('user-guess');
guessField.addEventListener("keyup", enableClear);

// In all cases below the `function` keyword is used instead of arrow notation
// This is for my own readability since it is my first JS program

// user can reset guessing range
function setRange() {
  // collect user entered ranges into integer form
  let loEntry = parseInt(document.getElementById('range-low-end').value);
  let hiEntry = parseInt(document.getElementById('range-high-end').value);

  // guard against user entering non-numbers, display alert if so
  if ( isNaN(loEntry) || isNaN(hiEntry) ) {
    alert(`Oops, make sure the range is numbers!`);
  // guard against user entering invalid range, display alert if so
  } else if (loEntry >= hiEntry) {
    alert(`Oops, starting number must be lower than ending number!`)
    // assign the user's valid range to the function scope lo/hi variables
  } else {
    rangeLoEnd = loEntry;
    rangeHiEnd = hiEntry;
    // reset game with new variables
    resetGame(rangeLoEnd, rangeHiEnd);
    // enable game reset button now that the user has customzed range
    enableReset();
  }
}

// check that user's guess input is valid ofr gameplay
function validateInput() {
  // collect user guess from input field
  // assign with `const` because within function value is not reassigned
  const x = guessField.value;
  // allow a cheat
  if (x == "cheat") {
    guessFeedback.innerHTML =
    `Decided to cheat, huh? OK, the answer is ${secretNumber}.`;
    // clear the field after entry
    guessField.value = '';
    // for some reason reset needed to be reenabled - check this later
    enableReset();
    // alert user if they didn't enter a number
  } else if (isNaN(x)) {
    guessField.value = '';
    alert
    (`Oops, that's not a number. Try a guess between ${rangeLoEnd}-${rangeHiEnd}!`);
    // alert user if they entered a number out of range
  } else if (x < rangeLoEnd || x > rangeHiEnd) {
    guessField.value = '';
    alert
    (`Oops! Your guess was not between ${rangeLoEnd}-${rangeHiEnd}, try again!`);
    // otherwise guess is valid for gameplay and can be evaluated
  } else
  evaluateGuess();
  enableReset();
}

// evaluate guess for correctness or other feedback to assist user
function evaluateGuess() {
  // collect user guess in integer form
  // should change `let` below to `const`
  // because within this method the values are not reassigned
  let userGuess = parseInt(guessField.value);
  // there was a need below to clear the UI
  winFeedback.innerHTML = ''
  // guess is compared to the secret
  // if guess is correct, expand guessing range
  if (userGuess === secretNumber) {
    let challengeRangeHiEnd = rangeHiEnd + 10;
    let challengeRangeLoEnd = rangeLoEnd - 10;
    resetGame(challengeRangeLoEnd, challengeRangeHiEnd);
    // inform user they have won and guessing range has expanded
    winFeedback.innerHTML =
    `BOOM. Correct guess, you win! You clearly need a new challenge.
    Your guessing range is now ${rangeLoEnd} - ${rangeHiEnd}.`;
    // inform user if guess was too high
  } else if (userGuess > secretNumber) {
    guessFeedback.innerHTML = `You guessed ${userGuess}. That is too high.`;
    // inform user if guess was too low
  } else if (userGuess < secretNumber) {
    guessFeedback.innerHTML = `You guessed ${userGuess}. That is too low.`;
    // below condition probably now unecessary, was used in development
  } else {
    guessFeedback.innerHTML = `Oops, something went wrong. Please refresh page.`;
  }
}

// on `clear` click, clear guess field and disable clear button
function clearGuess() {
  guessField.value = '';
  clearButton.disabled=true;
}

// on `reset` click, either set range back to 1-100 or accept new user range
// the below parameters default to 1-100 if no user range supplied
function resetGame(newRangeLoEnd = 1, newRangeHiEnd = 100) {
  // temp fix for bug that appeared when changing reset button to eventListener
  if (newRangeLoEnd == "[object MouseEvent]") {
    newRangeLoEnd = 1;
  }
  // reset the range
  rangeLoEnd = newRangeLoEnd
  rangeHiEnd = newRangeHiEnd
  // clear the UI in case this reset comes from reset button instead of win condition
  if (newRangeLoEnd == 1 && newRangeLoEnd == 100) {
    winFeedback.innerHTML = '';
  }
  // reset the feedback informing user of current range
  rangeFeedback.innerHTML =
  `Guess a number between ${rangeLoEnd} and ${rangeHiEnd}...`

   // reset secret number and all other UI back to starting appearance
  secretNumber = Math.floor(Math.random() * rangeHiEnd) + rangeLoEnd;
  guessFeedback.innerHTML = 'Make your first guess below:';
  winFeedback.innerHTML = '';
  guessField.value = '';
  document.getElementById('range-low-end').value = '';
  document.getElementById('range-high-end').value = '';
  clearButton.disabled=true;
  resetButton.disabled=true;
}

// turn on the clear button, used when the guess field is not empty
function enableClear() {
  if (guessField.value == '') {
    clearButton.disabled=true;
  } else {
    clearButton.disabled=false;
  }
}

// turn on  the reset button, used either after guess submitted or range reset
function enableReset() {
  resetButton.disabled=false;
}
