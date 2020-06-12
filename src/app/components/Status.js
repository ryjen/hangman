import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppContext } from "app/AppContext";
import PropTypes from "prop-types";

const Status = (props) => {
  const context = useContext(AppContext);
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.item}>
        Remaining: {context.state.guesses.length} / {context.state.maxGuesses}
      </Text>
    </View>
  );
};

Status.propTypes = {
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  item: {},
});

export default Status;
