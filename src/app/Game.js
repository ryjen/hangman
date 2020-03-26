"use strict"
import React, {useContext, useEffect, useState} from "react"
import {StyleSheet, View, Alert} from "react-native"
import GallowsPole from "components/GallowsPole"
import Hangman from "components/Hangman"
import Tiles from "components/Tiles"
import {Context as AppContext} from "app/Context"
import GameOver from "components/GameOver"
import Logic from "app/Logic"
import {Create,Guess,Update} from "actions"

// A game component
const Game = () => {

    // use a contextual state with dispatch/reducer
    const context = useContext(AppContext)

    // component state
    const [finished, setFinished] = useState(false)

    // callback when guessing a letter
    const onGuessLetter = (text, index): boolean  => {
        if (!text || text.length === 0) {
            // nothing to do
            return false
        }

        // create a copy
        const items = context.state.letters.slice()

        const item = items[index]

        // determine if guess was correct
        item.guessed = text.toUpperCase() === item.letter.toUpperCase()

        // dispatch guess result to context
        context.dispatch(item.guessed ? Guess.correct() : Guess.wrong())

        // dispatch new letters value to context
        context.dispatch(Update.tiles(items))

        // determine if the game is finished
        setFinished(context.state.guesses >= context.state.maxGuesses || context.state.guessed >= context.state.letters.length)

        // return guessed result for immediate feedback
        return item.guessed
    }

    // callback for starting a new game
    const onNewGame = () => {

        // get a new random word...
        Logic.getRandomWord().then(word => {
            const data = []
            // create the letter objects
            for (let i = 0; i < word.length; i++) {
                data.push({
                    letter: word[i].toUpperCase(),
                    guessed: false
                })
            }

            // dispatch new word to create a game in context
            context.dispatch(Create.tiles(data))
        }, error => {
            Alert.alert("Network Error", error)
        })
    }

    // start a new game when app loads
    useEffect(onNewGame, [])

    // return the view
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <GallowsPole style={styles.pole}/>
                <Hangman style={styles.hangman}/>
                <GameOver style={styles.status} show={finished} won={context.state.guesses < context.state.maxGuesses}/>
            </View>
            <Tiles style={styles.bottom} onGuess={onGuessLetter}/>
        </View>
    )
}

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
})

export default Game
