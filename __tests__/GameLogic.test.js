"use strict"
import {calcNumberGuessesForWordLength} from "app/GameLogic"

test("word size 9 = 9 guesses", () => {
    expect(calcNumberGuessesForWordLength(9)).toBe(9)
})

test("word size 8 = 6 guesses", () => {
    expect(calcNumberGuessesForWordLength(8)).toBe(6)
})

test("word size 12 = 9 guesses", () => {
    expect(calcNumberGuessesForWordLength(12)).toBe(9)
})
