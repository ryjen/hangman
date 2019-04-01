import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

class GallowsPole extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.pole} />
          <View style={styles.base} />
        </View>
        <View style={styles.poleArm} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "80%",
    margin: 80,
    borderColor: "green",
    borderWidth: 1
  },
  left: {
    borderColor: "blue",
    borderWidth: 1,
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch"
  },
  poleArm: {
    borderTopColor: "black",
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderRightColor: "black",
    flexGrow: 1,
    height: "20%",
    marginEnd: 80
  },
  pole: {
    borderColor: "red",
    borderWidth: 1,
    borderRightColor: "black",
    borderRightWidth: 3,
    flexGrow: 1,
    minWidth: 50
  },
  base: {
    backgroundColor: "black",
    width: "80%",
    height: "15%"
  }
});

export default GallowsPole;