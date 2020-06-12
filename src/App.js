"use strict";
import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import GallowsPole from "components/GallowsPole";
import Hangman from "components/Hangman";
import Tiles from "components/Tiles";
import { AppContext, AppContextProvider } from "app/AppContext";
import GameOver from "components/GameOver";
import GuessList from "components/Guess";
import Status from "components/Status";
import { getRandomWord } from "app/GameLogic";

// A game component
const Game = (props) => {
  // use a contextual state with dispatch/reducer
  const context = useContext(AppContext);

  // callback for starting a new game
  const onNewGame = () => {
    // get a new random word...
    getRandomWord().then((word) => {
      // dispatch new word to create a game in context
      context.dispatch({
        type: "create",
        payload: word.toUpperCase().split(""),
      });
    });
  };

  // start a new game when app loads
  useEffect(onNewGame, []);

  // return the view
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <GallowsPole style={styles.pole} />
        <Hangman style={styles.hangman} />
        <GameOver style={styles.modal} onNewGame={onNewGame} />
      </View>
      <View style={styles.bottom}>
        <Tiles />
        <GuessList style={styles.guess} />
        <Status style={styles.status} />
      </View>
    </View>
  );
};

// The app component has a context and a game.
const App = () => {
  return (
    <AppContextProvider>
      <Game />
    </AppContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF",
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: "20%",
  },
  pole: {},
  top: {
    flexGrow: 1,
    marginBottom: 20,
  },
  bottom: {},
  hangman: {
    position: "absolute",
    top: 120,
    left: 70,
  },
  modal: {
    position: "absolute",
    bottom: 80,
    left: 40,
    right: 40,
  },
  guess: {
    marginTop: 15,
  },
  status: {
    marginTop: 15,
  },
});

export default App;
