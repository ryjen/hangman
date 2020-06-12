import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { AppContext } from "app/AppContext";
import PropTypes from "prop-types";

const Tile = (props) => {
  const context = useContext(AppContext);

  const { value } = props;

  const code = value.charCodeAt(0);

  const guessed =
    code < 65 || code > 91 || context.state.guessed.includes(value);

  return (
    <Text
      maxLength={1}
      style={[styles.letter, guessed ? styles.known : styles.unknown]}
    >
      {guessed ? value : "?"}
    </Text>
  );
};

Tile.propTypes = {
  value: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  letter: {
    fontSize: 40,
    marginStart: 5,
    marginEnd: 5,
  },
  known: {
    color: "black",
  },
  unknown: {
    color: "black",
    borderBottomWidth: 3,
    borderBottomColor: "black",
  },
});
export default Tile;
