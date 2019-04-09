import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import AppContext from "../AppContext";

export const MaxBodyParts = 6;

class Hangman extends Component {

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={[styles.head, this.getVisibility(0)]} />
        <View style={styles.body}>
          <View style={[styles.leftArm, this.getVisibility(2)]} />
          <View style={[styles.torso, this.getVisibility(1)]} />
          <View style={[styles.rightArm, this.getVisibility(3)]} />
        </View>
        <View style={styles.footer}>
          <View style={[styles.leftLeg, this.getVisibility(4)]} />
          <View style={[styles.rightLeg, this.getVisibility(5)]} />
        </View>
      </View>
    );
  }

  getVisibility(pos) {
    let max = this.context.maxGuesses % MaxBodyParts;
    let index = this.context.guesses % pos;

    console.log(index)

    return { display: (index < max) ? 'flex' : 'none' };
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
