"use strict";

// the number of body parts before the hangman is complete
export const MaxBodyParts = 6;

// not so terribly efficient but will do for now
const Words = require("./Words.json");

// Calculates how many guesses given a word length - the purpose is have extra guesses on really long words
// The default and minimum is the number of body parts
// TODO: improve if necessary
export const calcNumberGuessesForWordLength = (
  len,
  defaultLen = MaxBodyParts
) => {
  // ensure default is minimum
  if (len < defaultLen) {
    return defaultLen;
  }

  // the increment is half the default
  const inc = defaultLen / 2;

  // how much over the default length is the word?
  let diff = len - defaultLen;

  // the return value after processing
  let value = defaultLen;

  // while we are over the default value...
  while (diff >= inc) {
    // add the increment to the return value
    value += inc;
    // and subtract the increment from the difference
    diff -= inc;
  }

  return value;
};

// tests if a body part is visible given the ratio of guesses to allowed guesses
// @param part the body part index to test for visibility
// @param guesses the current number of missed guesses
// @param maxGuesses the maximum allowed missed guesses
export const isBodyPartVisibleForGuess = (part, guesses, maxGuesses) => {
  // determine the number of guesses allowed for each body part
  const guessesPerPart = Math.floor(maxGuesses / MaxBodyParts);

  // determine the body part index for the missed guesses
  const index = Math.floor(guesses / guessesPerPart);

  // determine if the body part to view is less than missed guesses index
  return part < index;
};

export const isGameWon = (state) => {
  return state.letters.every((letter) => {
    const code = letter.charCodeAt(0);
    if (code < 65 || code > 91) {
      return true;
    }
    return state.guessed.includes(letter);
  });
};

/**
 * Gets a random word and returns a promise
 export const getRandomWord = () => fetch("https://random-word.ryanrk.com/api/en/word/random").then(
    function (response) {
      return response.json().then((words) => words[0].toUpperCase());
    });
*/
export const getRandomWord = () =>
  new Promise((resolve, reject) => {
    const keys = Object.keys(Words).filter(
      (w) => w.length > 3 && w.length < 12
    );
    if (keys.length === 0) {
      reject(new Error("No words found"));
      return;
    }
    const index = (keys.length * Math.random()) << 0;
    const word = keys[index].toUpperCase();
    resolve(word);
  });
