'use strict';
import React, { useReducer, createContext } from "react";
import {calcNumberGuessesForWordLength} from "./GameLogic";

const AppContext = createContext();

const initialState = {
    letters: [],
    guess: () => {
    },
    maxGuesses: 0,
    guesses: 0,
    guessed: 0
};

const reducer  = (state, action) => {
    switch(action.type) {
        case "reset":
            return initialState;
        case "guessed":
            return { ...state, guessed: state.guessed + 1 };
        case "guess":
            return { ...state, guesses: state.guesses + 1 };
        case "update":
            return { ...state, letters: action.payload };
        case "create":
            return { ...state,
                letters: action.payload,
                maxGuesses: calcNumberGuessesForWordLength(action.payload.length),
                guesses: 0,
                guessed: 0
            };
        case "callback":
            return { ...state, guess: action.payload };
    }
};

const AppContextProvider = props => {
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return (<AppContext.Provider value={value}>{props.children}</AppContext.Provider>);
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
