import type Tiles from "types/Tiles"

type State = {
    letters: Tiles,
    maxGuesses: number,
    guesses: number,
    guessed: number
}

export default State
