"use strict"
import React, {useContext} from "react"
import {FlatList, StyleSheet, KeyboardAvoidingView} from "react-native"
import {Context as AppContext} from "app/Context"
import Tile from "components/Tile"

// the letter to display on a wrong guess
export const ErrorLetter = "⊘"

type Props = {
    onGuess: () => void,
    style?: StyleSheet.ViewStyleProp
}

// a component to display a list of tiles for letters
const Tiles = (props: Props) => {
    // app state
    const context = useContext(AppContext)

    return (
        <KeyboardAvoidingView style={[styles.container, props.style]}>
            <FlatList
                horizontal
                data={context.state.letters}
                renderItem={row => <Tile letter={row.item} index={row.index} onGuess={props.onGuess} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
})

export default Tiles
