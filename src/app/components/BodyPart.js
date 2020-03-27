"use strict"
import * as React from "react"
import {View, StyleSheet} from "react-native"

type Props = {
    show: boolean,
    style?: StyleSheet.ViewStyleProp,
    children?: React.Node
}

// component to display a body part of the hangman
const BodyPart = (props: Props) => {
    const {children, show, style} = props

    if (!show) {
        return null
    }

    return (
        <View {...props} style={style}>
            {children}
        </View>
    )
}

export default BodyPart
