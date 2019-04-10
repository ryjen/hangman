'use strict';
import React, {useContext} from "react";
import {Platform, StyleSheet, Text, View} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import AppContext from "app/AppContext";

const FAType = Platform.OS === "ios" ? "Font Awesome 5 Free" : "fa_solid_900";

const GameOver = props => {
    if (!props.show) {
        return null;
    }

    const context = useContext(AppContext);

    let message = "You survived!";
    let icon = Icons.checkCircle;

    if (context.guesses >= context.maxGuesses) {
        message = "You died!";
        icon = Icons.skull;
    }

    return (
        <View style={[styles.container, props.style]}>
            <FontAwesome type={FAType} style={styles.icon}>
                {icon}
            </FontAwesome>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

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
});

export default GameOver;
