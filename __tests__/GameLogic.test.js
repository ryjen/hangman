import { calcNumberGuessesForWordLength } from "../app/GameLogic.js";

test("word size 9 = 9 guesses", () => {
  expect(calcNumberGuessesForWordLength(9)).toBe(9);
});