'use strict';

export const MaxBodyParts = 6;

// TODO: improve if necessary
export function calcNumberGuessesForWordLength(len, defaultLen = MaxBodyParts) {
    if (len < defaultLen) {
        return defaultLen;
    }

    let inc = defaultLen / 2;

    let diff = len - defaultLen;
    let value = defaultLen;

    while (diff >= inc) {
        value += inc;
        diff -= inc;
    }

    return value;
}

export function isBodyPartVisibleForGuess(part, guesses, maxGuesses) {

    const guessesPerPart = Math.floor(maxGuesses / MaxBodyParts);

    const index = Math.floor(guesses / guessesPerPart);

    return part < index;
}

export function getRandomWord() {
    return fetch("https://random-word.ryanrk.com/api/en/word/random")
        .then(function (response) {
            return response
                .json()
                .then(words => words[0])
        })
}
