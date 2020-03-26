import React from "react"
import { ContextProvider } from "./Context"
import Game from "./Game"

// The app component has a context and a game.
const App = () => {
    return (
        <ContextProvider>
            <Game/>
        </ContextProvider>
    )
}

export default App
