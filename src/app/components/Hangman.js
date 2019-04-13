'use strict';
import React, {useContext} from "react";
import {StyleSheet, View} from "react-native";
import {isBodyPartVisibleForGuess} from "app/GameLogic";
import {AppContext} from "../AppContext";

// component to display a body part of the hangman
const BodyPart = props => {
    const {children, show, style} = props;
    return (
        <View {...props} style={[style, {opacity: show ? 1 : 0}]}>
            {children}
        </View>
    );
};

// component to display the entire hangman
const Hangman = props => {

    // get the app state
    const state = useContext(AppContext);

    // utility function to test if a body part is visible
    function isVisible(pos) {
        return isBodyPartVisibleForGuess(pos, state.guesses, state.maxGuesses);
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
    );
};

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
});

export default Hangman;
