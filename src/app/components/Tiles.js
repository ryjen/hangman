'use strict';
import React, {useState, useContext, useEffect} from "react";
import {Animated, FlatList, StyleSheet, TextInput, View} from "react-native";
import {AppContext} from "app/AppContext";

export const ErrorLetter = "⊘";

const Tiles = props => {

    const [fadeAnim] = useState(new Animated.Value(0.0));

    const {fadeItem, setFadeItem} = useState(-1);

    const state = useContext(AppContext);

    useEffect(() => {
        fadeAnimation();
    }, fadeItem);


    function fadeAnimation() {
        if (fadeItem === -1) {
            return;
        }

        Animated.sequence([
            Animated.timing(fadeAnim, {toValue: 1.0, duration: 500}),
            Animated.delay(2000),
            Animated.timing(fadeAnim, {toValue: 0.0, duration: 500})
        ]).start(() => {
            setFadeItem(-1);
        });
    }

    function renderTile(row) {
        const item = row.item;

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
                        if (!state.guess(text, row.index)) {
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
                data={state.letters}
                extraData={fadeItem}
                renderItem={renderTile}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
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
