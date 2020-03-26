import Update from "actions/Update"

export default {
    correct: () => Update.guessed(),
    wrong: () => Update.guesses(),
}
