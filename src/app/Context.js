"use strict"
import React, {createContext, useReducer} from "react"
import type State from "types/State"
import { Create, Update } from "actions"
import type Action from "types/Action"

// create the context
const Context = createContext()

// the initial state of the context and the api for components
const initialState: State = {
    letters: [],
    maxGuesses: 0,
    guesses: 0,
    guessed: 0
}

// callback to transform state on an action
// should seem familiar if your used to redux
const reducer = (state: State, action: Action) => {
    switch (action.type) {
    case Update.type:
        return Update.reduce(state, action.payload)
    case Create.type:
        return Create.reduce(state, action.payload)
    }
}

// a context provider that automatically sets the value to provide
// the state and dispatcher of a reducer hook
const ContextProvider = (props: { children: React.Node }) => {
    // create a reducer with callback and initial state
    const [state, dispatch] = useReducer(reducer, initialState)
    // use reducer as a value for the context provider 
    const value = {state, dispatch}
    return (<Context.Provider value={value}>{props.children}</Context.Provider>)
}

// alias for the consumer to match the provider
const ContextConsumer = Context.Consumer

export {Context, ContextProvider, ContextConsumer, initialState}
