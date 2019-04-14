'use strict';
import React, {useState, useContext, useEffect} from "react";
import {Animated, FlatList, StyleSheet, TextInput, View} from "react-native";
import PropTypes from "prop-types";
import {AppContext} from "app/AppContext";

// the letter to display on a wrong guess
export const ErrorLetter = "⊘";

// a component to display a list of tiles for letters
const Tiles = props => {

    // component state for animation
    const [fadeAnim] = useState(new Animated.Value(0.0));

    // component state for which tile to animate
    const [fadeItem, setFadeItem] = useState(-1);

    // app state
    const context = useContext(AppContext);

    // start the fade animation when the selected item value changes
    useEffect(() => {
        fadeAnimation();
    }, [fadeItem]);


    // starts a fade animation for the component state value
    function fadeAnimation() {
        // ignore if nothing animating
        if (fadeItem === -1) {
            return;
        }

        Animated.sequence([
            Animated.timing(fadeAnim, {toValue: 1.0, duration: 500}),
            Animated.delay(2000),
            Animated.timing(fadeAnim, {toValue: 0.0, duration: 500})
        ]).start(() => {
            // reset animated item
            setFadeItem(-1);
        });
    }

    // callback to render a row in the tile list
    function renderTile(row) {
        const item = row.item;

        // determine if this row is being animated
        const isAnimating = row.index === fadeItem;

        return (
            <Animated.View
                style={{opacity: isAnimating ? fadeAnim : 1.0}}
            >
                <TextInput
                    editable={!item.guessed && !isAnimating}
                    maxLength={1}
                    clearTextOnFocus={true}
                    placeholder={"?"}
                    onChangeText={text => {
                        // when text changes, try to guess
                        if (!props.onGuess(text, row.index)) {
                            // if the guess is incorrect, set this row to be animated
                            setFadeItem(row.index);
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


    return (
        <View style={[styles.container, props.style]}>
            <FlatList
                horizontal
                data={context.state.letters}
                extraData={fadeItem}
                renderItem={renderTile}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

Tiles.propTypes =  {
    onGuess: PropTypes.func.isRequired
};

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
