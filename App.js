/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import GallowsPole from "./app/components/gallowspole";
import Hangman from "./app/components/hangman";
import Tiles from "./app/components/tiles";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <GallowsPole />
          <Hangman />
        </View>
        <Tiles />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
