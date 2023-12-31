import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";

export default props => {
    return(
        <Modal onRequestClose={props.onCancel} visible={props.isVisible} animationType="slide" transparent={true}>
            <View style={styles.frame}>
                <View style={styles.container}> 
                    <Text style={styles.title}>Choose the difficult</Text>
                    <TouchableOpacity style={[styles.button, styles.bgEasy]} onPress={() => props.onLvlSel(0.1)}>
                        <Text style={styles.buttonLabel}>Easy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.bgNormal]} onPress={() => props.onLvlSel(0.2)}>
                        <Text style={styles.buttonLabel}>Normal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.bgHard]} onPress={() => props.onLvlSel(0.3)}>
                        <Text style={styles.buttonLabel}>Hard</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    frame:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    container:{
        backgroundColor:'#eee',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
    },
    button:{
        marginTop:  10,
        padding: 5,
    },
    buttonLabel:{
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight:'bold',
    },
    bgEasy: {
        backgroundColor: '#93E4A2'
    },
    bgNormal:{
        backgroundColor:'#1F7C67',
    },
    bgHard:{
        backgroundColor:'#5F2514',
    }
})