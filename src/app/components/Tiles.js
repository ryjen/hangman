"use strict";
import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { AppContext } from "app/AppContext";
import Tile from "components/Tile";

// a component to display a list of tiles for letters
const Tiles = (props) => {
  // app state
  const context = useContext(AppContext);

  return (
    <View style={[styles.container, props.style]}>
      <FlatList
        horizontal
        data={context.state.letters}
        extraData={context.state.guessed}
        renderItem={(row, index) => <Tile key={index} value={row.item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

Tiles.propTypes = {
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export default Tiles;
