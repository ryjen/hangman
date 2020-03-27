import type Tile from "types/Tile"
import Logic from "app/Logic"
import { initialState } from "app/Context"

const type = "create"
const tiles = "tiles"
const reset = "reset"

type PayloadType = {
    id: string,
    value?: Array<Tile>
}

type ActionType = {
    type: string,
    payload: CreatePayload
}

const Action = (id: string, value?: any): ActionType => ({
    type,
    payload: { id, value }
})

const reduce = (state: State, payload: PayloadType): State => {
    switch (payload.id) {
    case tiles:
        return ({
            ...state,
            letters: payload.value,
            maxGuesses: Logic.calcNumberGuessesForWordLength(payload.value.length),
            guesses: 0,
            guessed: 0
        })
    case reset:
        return initialState
    }
}

export default {
    tiles: () => Action(tiles),
    reset: () => Action(reset),
    reduce,
}
