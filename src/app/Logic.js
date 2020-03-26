"use strict"

// the number of body parts before the hangman is complete
const MaxBodyParts = 6

// Calculates how many guesses given a word length
// The default and minimum is the number of body parts
// TODO: improve if necessary
const calcNumberGuessesForWordLength = (len: number, defaultLen: number = MaxBodyParts): number => {

    // ensure default is minimum
    if (len < defaultLen) {
        return defaultLen
    }

    // the increment is half the default
    let inc = defaultLen / 2

    // how much over the default length is the word?
    let diff = len - defaultLen

    // the return value after processing
    let value = defaultLen

    // while we are over the default value...
    while (diff >= inc) {
        // add the increment to the return value
        value += inc
        // and subtract the increment from the difference
        diff -= inc
    }

    return value
}

// tests if a body part is visible given the ratio of guesses to allowed guesses
// @param part the body part index to test for visibility
// @param guesses the current number of missed guesses
// @param maxGuesses the maximum allowed missed guesses
const isBodyPartVisibleForGuess = (part: number, guesses: number, maxGuesses: number): boolean => {

    // determine the number of guesses allowed for each body part
    const guessesPerPart = Math.floor(maxGuesses / MaxBodyParts)

    // determine the body part index for the missed guesses
    const index = Math.floor(guesses / guessesPerPart)

    // determine if the body part to view is less than missed guesses index
    return part < index
}

// gets a random word from an api
const getRandomWord = (): Promise<string> => {
    return fetch("https://random-word.ryanrk.com/api/en/word/random")
        .then(response => {
            return response
                .json()
                .then(words => words[0])
        })
}

export default {
    MaxBodyParts,
    calcNumberGuessesForWordLength,
    isBodyPartVisibleForGuess,
    getRandomWord
}
