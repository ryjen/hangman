"use strict"
import React, {useState} from "react"
import {Animated, TextInput, StyleSheet} from "react-native"
import {ErrorLetter} from "./Tiles"
import type {Tile as TileType} from "types/Tile"

type Props = {
    value: TileType,
    index: number,
    onGuess: (string, number) => boolean
}

const Tile = (props: Props) => {
    const {value, index} = props

    // component state for animation
    const [fadeAnim] = useState(new Animated.Value(0.0))

    const [isAnimating, setAnimating] = useState(false)

    const viewStyle = {opacity: isAnimating ? fadeAnim : 1.0}

    return (
        <Animated.View style={viewStyle}>
            <TextInput
                editable={!value.guessed && !isAnimating}
                maxLength={1}
                clearTextOnFocus={true}
                placeholder={"?"}
                onChangeText={text => {
                    // when text changes, try to guess
                    if (!props.onGuess(text, index)) {
                        // if the guess is incorrect, set this row to be animated
                        setAnimating(true)
                        Animated.sequence([
                            Animated.timing(fadeAnim, {toValue: 1.0, duration: 500}),
                            Animated.timing(fadeAnim, {delay: 2000, toValue: 0.0, duration: 500})
                        ]).start(() => {
                            setAnimating(false)
                        })
                    }
                }}
                style={[
                    styles.letter,
                    value.guessed
                        ? styles.known
                        : isAnimating
                            ? styles.error
                            : styles.unknown
                ]}
                value={value.guessed ? value.letter : isAnimating ? ErrorLetter : ""}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
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
})

export default Tile
