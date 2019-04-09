import React, { Component } from "react";
import { View, FlatList, StyleSheet, Animated, TextInput } from "react-native";
import AppContext from "../AppContext";

export const ErrorLetter = "⊘";

class Tiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0.0),
      fadeItem: -1
    };

    this.renderTile = this.renderTile.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.fadeItem !== prevState.fadeItem) {
      this.fadeAnimation();
    }
  }

  fadeAnimation() {
    if (this.state.fadeItem === -1) {
      return;
    }

    Animated.sequence([
      Animated.timing(this.state.fadeAnim, { toValue: 1.0, duration: 500 }),
      Animated.delay(2000),
      Animated.timing(this.state.fadeAnim, { toValue: 0.0, duration: 500 })
    ]).start(() => {
      this.setState({ fadeItem: -1 });
    });
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <FlatList
          horizontal
          data={this.context.letters}
          extraData={this.state.fadeItem}
          renderItem={this.renderTile}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
  renderTile(row) {
    const item = row.item;

    const isAnimating = row.index === this.state.fadeItem;

    return (
      <Animated.View
        style={{ opacity: isAnimating ? this.state.fadeAnim : 1.0 }}
      >
        <TextInput
          editable={!item.guessed && !isAnimating}
          maxLength={1}
          clearTextOnFocus={true}
          placeholder={"?"}
          onChangeText={text => {
            if (!this.context.guess(text, row.index)) {
              this.setState({ fadeItem: row.index });
            }
          }}
          style={[
            styles.letter,
            item.guessed
              ? styles.known
              : isAnimating
              ? styles.error
              : styles.unknown
          ]}
          value={item.guessed ? item.letter : isAnimating ? ErrorLetter : ""}
        />
      </Animated.View>
    );
  }
}

Tiles.contextType = AppContext;

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  letter: {
    fontSize: 40,
    marginStart: 3,
    marginEnd: 3
  },
  known: {
    color: "black"
  },
  error: {
    color: "red"
  },
  unknown: {
    color: "black",
    borderBottomWidth: 3,
    borderBottomColor: "black"
  }
});

export default Tiles;
