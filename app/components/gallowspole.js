import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

class GallowsPole extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.pole}>
          <View style={styles.stem} />
          <View style={styles.arm} />
        </View>
        <View style={styles.base} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  pole: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "row"
  },
  arm: {
    borderTopColor: "black",
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderRightColor: "black",
    flexBasis: 130,
    height: 120
  },
  stem: {
    borderRightColor: "black",
    borderRightWidth: 10,
    flexBasis: 110
  },
  base: {
    backgroundColor: "black",
    height: 40
  }
});

export default GallowsPole;