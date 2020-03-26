"use strict"
import React, {createContext, useReducer} from "react"
import {calcNumberGuessesForWordLength} from "./GameLogic"

// create the context
const AppContext = createContext()

// the initial state of the context and the api for components
const initialState = {
    letters: [],
    maxGuesses: 0,
    guesses: 0,
    guessed: 0
}

// callback to transform state on an action
// should seem familiar if your used to redux
const reducer = (state, action) => {
    switch (action.type) {
    case "reset":
        return initialState
    case "guessed":
        return {...state, guessed: state.guessed + 1}
    case "guess":
        return {...state, guesses: state.guesses + 1}
    case "update":
        return {...state, letters: action.payload}
    case "create":
        return {
            ...state,
            letters: action.payload,
            maxGuesses: calcNumberGuessesForWordLength(action.payload.length),
            guesses: 0,
            guessed: 0
        }
    }
}

// a context provider that automatically sets the value to provide
// the state and dispatcher of a reducer hook
const AppContextProvider = props => {
    // create a reducer with callback and initial state
    const [state, dispatch] = useReducer(reducer, initialState)
    // use reducer as a value for the context provider 
    const value = {state, dispatch}
    return (<AppContext.Provider value={value}>{props.children}</AppContext.Provider>)
}

// alias for the consumer to match the provider
const AppContextConsumer = AppContext.Consumer

export {AppContext, AppContextProvider, AppContextConsumer}
