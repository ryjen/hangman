/**
 * @format
 * @flow
 */
'use strict';
import React, { useContext, useState } from "react";
import {StyleSheet, View} from "react-native";
import GallowsPole from "components/GallowsPole";
import Hangman from "components/Hangman";
import Tiles from "components/Tiles";
import {AppContext, AppContextProvider} from "app/AppContext";
import GameOver from "components/GameOver";
import {getRandomWord} from "app/GameLogic";

const Game = () => {

    const {state, dispatch} = useContext(AppContext);

    const {finished, setFinished} = useState(false);

    function onGuessLetter(text, index) {
        if (!text) {
            return false;
        }

        const items = state.letters.slice();

        const item = items[index];

        item.guessed = text.toUpperCase() === item.letter.toUpperCase();

        dispatch({ type: item.guessed ? "guessed" : "guess"});

        dispatch({ type: "letters", payload: items});

        setFinished(state.guesses >= state.maxGuesses || state.guessed >= state.letters.length);

        return item.guessed;
    }

    function onNewGame() {
        getRandomWord().then(word => {
            const data = [];
            for (let i = 0; i < word.length; i++) {
                data.push({
                    letter: word[i].toUpperCase(),
                    guessed: false
                });
            }

            dispatch({type: "create", payload: data})
        });
    }

    onNewGame();

    dispatch({type: "callback", payload: onGuessLetter});

    return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <GallowsPole style={styles.pole}/>
                    <Hangman style={styles.hangman}/>
                    <GameOver style={styles.status} show={finished}/>
                </View>
                <Tiles style={styles.bottom}/>
            </View>
    );
};

const App = () => {
    return (
        <AppContextProvider>
            <Game />
        </AppContextProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        backgroundColor: "#F5FCFF",
        paddingStart: 20,
        paddingEnd: 20,
        paddingTop: "20%"
    },
    pole: {},
    top: {
        flexGrow: 1,
        marginBottom: 20
    },
    bottom: {},
    hangman: {
        position: "absolute",
        top: 120,
        left: 70
    },
    status: {
        position: "absolute",
        bottom: 80,
        left: 40,
        right: 40
    }
});

export default App;