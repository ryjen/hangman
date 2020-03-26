"use strict"
import React, {useContext} from "react"
import {StyleSheet, View} from "react-native"
import Logic from "app/Logic"
import {Context as AppContext} from "app/Context"
import BodyPart from "components/BodyPart"

type Props = {
    style?: StyleSheet.ViewStyleProp
}

// component to display the entire hangman
const Hangman = (props: Props) => {

    // get the app state
    const context = useContext(AppContext)

    // utility function to test if a body part is visible
    function isVisible(pos) {
        return Logic.isBodyPartVisibleForGuess(pos, context.state.guesses, context.state.maxGuesses)
    }

    return (
        <View style={[styles.container, props.style]}>
            <BodyPart style={styles.head} show={isVisible(0)}/>
            <View style={styles.body}>
                <BodyPart style={styles.leftArm} show={isVisible(2)}/>
                <BodyPart style={styles.torso} show={isVisible(1)}/>
                <BodyPart style={styles.rightArm} show={isVisible(3)}/>
            </View>
            <View style={styles.footer}>
                <BodyPart style={styles.leftLeg} show={isVisible(4)}/>
                <BodyPart style={styles.rightLeg} show={isVisible(5)}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    head: {
        borderRadius: 30,
        height: 60,
        width: 60,
        backgroundColor: "black"
    },
    body: {
        flex: 1,
        flexDirection: "row"
    },
    leftArm: {
        transform: [{rotate: "150deg"}],
        height: 0,
        width: 80,
        borderBottomColor: "black",
        borderBottomWidth: 10,
        position: "relative",
        left: 90,
        top: 50
    },
    torso: {
        width: 0,
        marginStart: 80,
        marginEnd: 80,
        borderLeftColor: "black",
        borderLeftWidth: 10,
        height: 140
    },
    rightArm: {
        transform: [{rotate: "35deg"}],
        height: 0,
        width: 80,
        borderBottomColor: "black",
        borderBottomWidth: 10,
        position: "relative",
        right: 92,
        top: 50
    },
    footer: {
        flex: 1,
        flexDirection: "row"
    },
    leftLeg: {
        transform: [{rotate: "135deg"}],
        height: 0,
        width: 80,
        borderBottomColor: "black",
        borderBottomWidth: 10,
        position: "relative",
        top: 20,
        right: -12
    },
    rightLeg: {
        transform: [{rotate: "45deg"}],
        height: 0,
        width: 80,
        borderBottomColor: "black",
        borderBottomWidth: 10,
        position: "relative",
        top: 20,
        left: -12
    }
})

export default Hangman
