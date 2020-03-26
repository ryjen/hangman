import type Tile from "types/Tile"
import { initialState } from "app/Context"

const type = "update"
const tiles = "tiles"
const guessed = "guessed"
const guesses = "guesses"
const reset = "reset"

type UpdatePayload = {
    id: string,
    value?: Array<Tile>
}

type UpdateAction = {
    type: string,
    payload: UpdatePayload
}

const Action = (id: string, value?: any): UpdateAction => ({
    type,
    payload: { id, value }
})

const reducer = (state: State, payload: UpdatePayload) => {
    switch(payload.id) {
    case tiles:
        return {...state, letters: payload.value}
    case guessed:
        return {...state, guessed: state.guessed + 1}
    case guesses:
        return {...state, guesses: state.guesses + 1}
    case reset:
        return initialState
    }
}

export default {
    tiles: (payload: Array<Tile>) => Action(tiles, payload),
    guessed: () => Action(guessed),
    guesses: () => Action(guesses),
    reset: () => Action(reset),
    reducer
}
