"use strict"
import React from "react"
import {Platform, StyleSheet, Text, View} from "react-native"
import FontAwesome, {Icons} from "react-native-fontawesome"

// determine the font awesome font name for platform
const IconType = Platform.OS === "ios" ? "Font Awesome 5 Free" : "fa_solid_900"

type Props = {
    show: boolean,
    won: boolean,
    style?: StyleSheet.ViewStyleProp
}

// a component to display a message if the game is over
const GameOver = (props: Props) => {
    if (!props.show) {
        return null
    }

    // view parameters
    let message
    let icon

    // if we ran out of guesses...
    if (!props.won) {
        // display death
        message = "You died!"
        icon = Icons.skull
    } else {
        // otherwise, you survived
        message = "You survived!"
        icon = Icons.checkCircle
    }

    return (
        <View style={[styles.container, props.style]}>
            <FontAwesome type={IconType} style={styles.icon}>
                {icon}
            </FontAwesome>
            <Text style={styles.message}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d3d3d3",
        borderColor: "#696969",
        borderRadius: 10,
        borderWidth: 3,
        padding: 20
    },
    icon: {
        fontSize: 50
    },
    message: {
        fontSize: 50
    }
})

export default GameOver
