/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import GallowsPole from "./app/components/gallowspole";
import Hangman, { MaxBodyParts } from "./app/components/hangman";
import Tiles from "./app/components/tiles";
import AppContext from "./app/AppContext";

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);

    this.onNewGame = this.onNewGame.bind(this);
    this.onGuessLetter = this.onGuessLetter.bind(this);

    this.state = {
      letters: [],
      guess: this.onGuessLetter,
      maxGuesses: MaxBodyParts,
      guesses: 0
    };

    this.onNewGame();

  }

  onGuessLetter(text, index) {
    if (!text) {
      return false;
    }

    const items = this.state.letters.slice();
    const item = items[index];
    item.guessed = text.toUpperCase() === item.letter.toUpperCase();
    items[index] = item;

    let guesses = this.state.guesses;

    if (!item.guessed) {
      guesses += 1;
    }

    this.setState({ letters: items, guesses: guesses});

    return item.guessed;
  }

  getRandomWord() {
    return fetch("https://random-word.ryanrk.com/api/en/word/random")
      .then(function (response) {
        return response.json()
          .then( words => words[0])
          .catch( err => console.log(`no word ${err}`))
      })
      .catch( err => console.log(`no word: ${err}`))
  }

  onNewGame() {
    this.getRandomWord().then( word => {

      console.log(word);

      const data = [];
      for (let i = 0; i < word.length; i++) {
        data.push({
          letter: word[i].toUpperCase(),
          guessed: false
        });
      }

      this.setState({
        letters: data,
        maxGuesses: this.calcNumberGuessesForWordLength(data.length),
        guesses: 0
      });
    });
  }

  // TODO: improve if necessary
  calcNumberGuessesForWordLength(len) {
    if (len < MaxBodyParts) {
      return MaxBodyParts;
    }

    let inc = MaxBodyParts / 2;

    let diff = len - MaxBodyParts;
    let value = MaxBodyParts;

    while (diff >= inc) {
      value += inc;
      diff -= inc;
    }

    return value;
  }

  render() {
    return (
        <AppContext.Provider value={this.state}>
          <View style={styles.container}>
            <View style={styles.top}>
              <GallowsPole style={styles.pole}/>
              <Hangman style={styles.hangman}/>
            </View>
            <Tiles style={styles.bottom}  />
          </View>
        </AppContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF",
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: "20%"
  },
  pole: {},
  top: {
    flexGrow: 1,
    marginBottom: 20
  },
  bottom: {},
  hangman: {
    position: "absolute",
    top: 120,
    left: 70
  }
});
