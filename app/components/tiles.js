import React, { Component } from "react";
import { View, FlatList, StyleSheet, Animated, TextInput } from "react-native";
import AppContext from "../AppContext";

export const ErrorLetter = "⊘";

class Tiles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0.0),
      guessed: -1
    };

    this.renderTile = this.renderTile.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.guessed !== prevState.guessed && this.state.guessed !== -1) {
      console.log("animating " + this.state.guessed);
      this.guessedAnimation();
    }
  }

  guessedAnimation() {
      Animated.sequence([
        Animated.timing(this.state.fadeAnim, {toValue: 1.0, duration: 500}),
        Animated.delay(2000),
        Animated.timing(this.state.fadeAnim,{toValue: 0.0, duration: 500})
      ]).start(() => {
        console.log("finished animating");
        this.setState({ guessed: -1 })
      });
  }

  render() {
    return (
        <View style={[styles.container, this.props.style]}>
          <FlatList
              horizontal
              data={this.context.letters}
              extraData={this.state.guessed}
              renderItem={this.renderTile}
              keyExtractor={(item, index) => index.toString()}
          />
        </View>
    );
  }
  renderTile(row) {
    const item = row.item;

    const isGuessed = row.index === this.state.guessed;

    return (
        <Animated.View style={ {opacity: isGuessed ? this.state.fadeAnim : 1.0} }>
        <TextInput
            editable={!item.guessed && !isGuessed}
            maxLength={1}
            clearTextOnFocus={true}
            placeholder={"?"}
            onChangeText={text => {
              this.context.guess(text, row.index);
              this.setState({guessed: row.index });
            }}
            style={[styles.letter, item.guessed ? styles.known : isGuessed ? styles.error : styles.unknown]}
            value={item.guessed ? item.letter : isGuessed ? ErrorLetter : ""}
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
    color: 'black'
  },
  error: {
    color: 'red'
  },
  unknown: {
    color: 'black',
    borderBottomWidth: 3,
    borderBottomColor: "black"
  }
});

export default Tiles;
