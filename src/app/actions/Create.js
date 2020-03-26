import type Tile from "types/Tile"
import Logic from "app/Logic"

const type = "create"

type PayloadType = Array<Tile>

const tiles = (payload: PayloadType) => ({
    type, payload
})

const reduce = (state: State, payload: PayloadType) => ({
    ...state,
    letters: payload,
    maxGuesses: Logic.calcNumberGuessesForWordLength(payload.length),
    guesses: 0,
    guessed: 0
})

export default {
    tiles,
    reduce,
}
