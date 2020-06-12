"use strict";
import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppContext, GameState } from "app/AppContext";
import PropTypes from "prop-types";
import { isGameWon } from "app/GameLogic";
import { accentColor } from "app/Style";

// a component to display a message if the game is over
const GameOver = (props) => {
  const context = useContext(AppContext);

  // determine if the game is finished
  const state = isGameWon(context.state)
    ? GameState.won
    : context.state.guesses.length >= context.state.maxGuesses
    ? GameState.finished
    : GameState.playing;

  if (state === GameState.playing) {
    return null;
  }

  const icons = ["🙃", "🙁", "🙂"];

  const messages = ["Keep going!", "Croaked!", "Survived!"];

  const colors = [
    null,
    {
      color: "red",
    },
    {
      color: "green",
    },
  ];

  return (
    <View style={[styles.container, props.style]}>
      <Text style={[styles.icon, colors[state]]}>{icons[state]}</Text>
      <Text style={styles.message}>{messages[state]}</Text>

      {state === GameState.finished ? (
        <View style={styles.solution}>
          <Text style={styles.solutionIntro}>The word was</Text>
          <Text style={styles.solutionWord}>
            {context.state.letters.join("")}
          </Text>
        </View>
      ) : null}

      <View style={styles.actions}>
        <Button
          title="New Game"
          onPress={props.onNewGame}
          color={accentColor}
        />
      </View>
    </View>
  );
};

GameOver.propTypes = {
  onNewGame: PropTypes.func.isRequired,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    borderColor: "#696969",
    borderRadius: 10,
    borderWidth: 3,
    padding: 20,
  },
  icon: {
    fontSize: 50,
  },
  message: {
    fontSize: 40,
  },
  actions: {
    marginTop: 20,
  },
  solution: {
    alignItems: "center",
  },
  solutionIntro: { fontSize: 18 },
  solutionWord: { fontSize: 24 },
});

export default GameOver;
