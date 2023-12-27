import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import parameters from "../parameters";
import Mine from "./Mine";
import Flag from "./Flag";

export default props => {

    const styleField = [styles.field]
    if (props.opened) styleField.push(styles.opened)
    if (props.exploded) styleField.push(styles.exploded)
    if (props.flagged) styleField.push(styles.flagged, styles.regular)
    if (!props.opened && !props.exploded) styleField.push(styles.regular)

    let color = null
    if (props.nearMines > 0){
        if (props.nearMines == 1) color = '#001069'
        if (props.nearMines == 2) color = '#CCB116'
        if (props.nearMines > 2 && props.nearMines < 6) color = '#C2695A'
        if (props.nearMines >= 6) color = '#F50909'
    }

    return(
        <TouchableWithoutFeedback onPress={props.onOpen} onLongPress={props.onSelect}>
            <View style={styleField}>
                {!props.mined && props.opened && props.nearMines > 0 ?
                    <Text style={[styles.label, {color: color}]}>
                        {props.nearMines}</Text> : false}
                {props.mined && props.opened ? <Mine/> : false}
                {props.flagged && !props.opened ? <Flag/> : false}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    field: {
        height: parameters.blockSize,
        width: parameters.blockSize,
        borderWidth: parameters.borderSize,
    },
    regular: {
        backgroundColor: '#384724',
        borderLeftColor: '#869E4F',
        borderTopColor: '#636E2E',
        borderRightColor: '#384421',
        borderBottomColor: '#74836A',
    },
    opened:{
        backgroundColor: '#5A4C1E',
        borderColor: '#201F1F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: parameters.fontSize,
    },
    exploded: {
        backgroundColor: '#471010',
        borderColor: '#520404',
    }
})
