import React from "react";

const AppContext = React.createContext({
  letters: [],
  guess: () => {},
  maxGuesses: 0,
  guesses: 0,
  guessed: 0
});

export default AppContext;