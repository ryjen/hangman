"use strict";
import React, { createContext, useReducer } from "react";
import { calcNumberGuessesForWordLength } from "./GameLogic";
import PropTypes from "prop-types";

// create the context
const AppContext = createContext();

export const GameState = { playing: 0, finished: 1, won: 2 };
Object.freeze(GameState);

export const Alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

// the initial state of the context and the api for components
const initialState = {
  letters: [],
  maxGuesses: 0,
  guesses: [],
  guessed: [],
  available: Alphabet.slice(),
};

// callback to transform state on an action
// should seem familiar if your used to redux
const reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "guessed":
      return {
        ...state,
        guessed: state.guessed.concat(action.payload),
        available: state.available.filter((c) => c !== action.payload),
      };
    case "guess":
      return {
        ...state,
        guesses: state.guesses.concat(action.payload),
        available: state.available.filter((c) => c !== action.payload),
      };
    case "create":
      return {
        ...initialState,
        letters: action.payload,
        maxGuesses: calcNumberGuessesForWordLength(action.payload.length),
      };
  }
};

// a context provider that automatically sets the value to provide
// the state and dispatcher of a reducer hook
const AppContextProvider = (props) => {
  // create a reducer with callback and initial state
  const [state, dispatch] = useReducer(reducer, initialState);
  // use reducer as a value for the context provider
  const value = { state, dispatch };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node,
};

// alias for the consumer to match the provider
const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
