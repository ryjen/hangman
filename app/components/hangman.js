import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import AppContext from "../AppContext";

export const MaxBodyParts = 6;

const BodyPart = (props) => {
  const { children, hide, style } = props;
  return (
    <View {...this.props} style={[style, {opacity: hide ? 0 : 1}]}>
      { children }
    </View>
  );
};

class Hangman extends Component {

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <BodyPart style={styles.head} hide={this.getVisibility(0)} />
        <View style={styles.body}>
          <BodyPart style={styles.leftArm} hide={this.getVisibility(2)} />
          <BodyPart style={styles.torso} hide={this.getVisibility(1)} />
          <BodyPart style={styles.rightArm} hide={this.getVisibility(3)} />
        </View>
        <View style={styles.footer}>
          <BodyPart style={styles.leftLeg} hide={this.getVisibility(4)} />
          <BodyPart style={styles.rightLeg} hide={this.getVisibility(5)} />
        </View>
      </View>
    );
  }

  getVisibility(pos) {
    
    const guessesPerPart = Math.floor(this.context.maxGuesses / MaxBodyParts);

    const index = Math.floor(this.context.guesses / guessesPerPart);

    return pos >= index
  }
}

Hangman.contextType = AppContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  head: {
    borderRadius: 30,
    height: 60,
    width: 60,
    backgroundColor: "black"
  },
  body: {
    flex: 1,
    flexDirection: "row"
  },
  leftArm: {
    transform: [{ rotate: "150deg" }],
    height: 0,
    width: 80,
    borderBottomColor: "black",
    borderBottomWidth: 10,
    position: "relative",
    left: 90,
    top: 50
  },
  torso: {
    width: 0,
    marginStart: 80,
    marginEnd: 80,
    borderLeftColor: "black",
    borderLeftWidth: 10,
    height: 140
  },
  rightArm: {
    transform: [{ rotate: "35deg" }],
    height: 0,
    width: 80,
    borderBottomColor: "black",
    borderBottomWidth: 10,
    position: "relative",
    right: 92,
    top: 50
  },
  footer: {
    flex: 1,
    flexDirection: "row"
  },
  leftLeg: {
    transform: [{ rotate: "135deg" }],
    height: 0,
    width: 80,
    borderBottomColor: "black",
    borderBottomWidth: 10,
    position: "relative",
    top: 20,
    right: -12
  },
  rightLeg: {
    transform: [{ rotate: "45deg" }],
    height: 0,
    width: 80,
    borderBottomColor: "black",
    borderBottomWidth: 10,
    position: "relative",
    top: 20,
    left: -12
  }
});

export default Hangman;
