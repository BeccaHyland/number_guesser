
// set default guessing range limits
  let rangeLoEnd = 1
  let rangeHiEnd = 100

  // generate a random number between 1-100
  let secretNumber = Math.floor(Math.random() * rangeHiEnd) + rangeLoEnd;

  let resetButton = document.getElementById('reset');
  let guessMessage = document.getElementById('guess-feedback');
  let resultMessage = document.getElementById('result-feedback');

  // user can reset guessing range
  function setRange () {
    let loEntry = parseInt(document.getElementById('range-low-end').value);
    let hiEntry = parseInt(document.getElementById('range-high-end').value);

    if ( isNaN(loEntry) || isNaN(hiEntry) ) {
      alert(`Oops, make sure the range is numbers!`);
    } else if (loEntry >= hiEntry) {
      console.log(loEntry);
      console.log(hiEntry);
      alert(`Oops, starting number must be lower than ending number!`)
    } else {
      rangeLoEnd = loEntry;
      rangeHiEnd = hiEntry;
      resetGame(rangeLoEnd, rangeHiEnd);
      console.log("secret = " + secretNumber);
    }
  }

  function validateInput() {
    const x = document.getElementById("user-guess").value;
    if (x == "cheat") {
      guessMessage.innerHTML = `Decided to cheat, huh? OK, the answer is ${secretNumber}.`;
      enableReset();
    } else if (isNaN(x)) {
      document.getElementById('user-guess').value = '';
      alert(`Oops, that's not a number. Try a guess between ${rangeLoEnd}-${rangeHiEnd}!`);
    } else if (x < rangeLoEnd || x > rangeHiEnd) {
      document.getElementById('user-guess').value = '';
      alert(`Oops! Your guess was not between ${rangeLoEnd}-${rangeHiEnd}, try again!`);
    } else
    displayGuess();
    enableReset();
  }

// the user enters a guess
// display the guess

  function displayGuess() {
    let userGuess = parseInt(document.getElementById("user-guess").value);
    resultMessage.innerHTML = ''
    // the guess is compared to the secret to see if it's too high, too low, or a match
    // display the guess and whether it's too high, too low, or match
    if (userGuess === secretNumber) {
      let newRangeHiEnd = rangeHiEnd + 10;
      let newRangeLoEnd = rangeLoEnd - 10;
      resetGame(newRangeLoEnd, newRangeHiEnd);
      resultMessage.innerHTML = `BOOM. Correct guess, you win! You clearly need a challenge. Your new guessing range is ${rangeLoEnd}-${rangeHiEnd}.`;
      console.log("secret = " + secretNumber);
    } else if (userGuess > secretNumber) {
      guessMessage.innerHTML = `You guessed ${userGuess}. That is too high.`;
      console.log("secret = " + secretNumber);
    } else if (userGuess < secretNumber) {
      guessMessage.innerHTML = `You guessed ${userGuess}. That is too low.`;
      console.log("secret = " + secretNumber);
    } else {
      guessMessage.innerHTML = `Oops, something went wrong. Please refresh page.`;
    }
  }

  function enableClear() {
    let guessField = document.getElementById('user-guess');
    let clearButton = document.getElementById('clear');
    if (guessField.value == '') {
      clearButton.disabled=true;
    } else {
      clearButton.disabled=false;
    }
  }

  function enableReset() {
    resetButton.disabled=false;
  }

  function resetGame(newRangeLoEnd = 1, newRangeHiEnd = 100) {
    rangeLoEnd = newRangeLoEnd
    rangeHiEnd = newRangeHiEnd
    // clear the result message about the range change if this reset comes from the reset button instead of the win condition
    if (newRangeLoEnd == 1 && newRangeLoEnd == 100) {
      resultMessage.innerHTML = '';
    }
    // reset the message informing user of current range
    let rangeMessage = document.getElementById('range-feedback');
    rangeMessage.innerHTML = `Guess a number between ${rangeLoEnd} and ${rangeHiEnd}...`

     // reset secret number and all other UI
    secretNumber = Math.floor(Math.random() * rangeHiEnd) + rangeLoEnd;
    guessMessage.innerHTML = 'Make your first guess below:';
    resultMessage.innerHTML = '';
    document.getElementById('user-guess').value = '';
    document.getElementById('range-low-end').value = '';
    document.getElementById('range-high-end').value = '';
    resetButton.disabled=true;
  }
