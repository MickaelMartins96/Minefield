import React, {Component} from "react";
import { SafeAreaView, StyleSheet, View, Text, Alert } from "react-native";
import parameters from "./src/parameters";
import Field from "./src/components/Field";
import Flag from "./src/components/Flag";
import MineField from "./src/components/MineField";
import { createMinedBoard, cloneBoard, openField, hadExplosion, wonGame, showMines, invertFlag, flagsUsed } from "./src/functions";
import Header from "./src/components/Header";
import LevelSelect from "./src/screens/LevelSelect";

export default class App extends Component{

    constructor(props){
        super(props)
        this.state = this.createState()
    }

    minesAmount = () => {
        const cols = parameters.getColumnsAmount()
        const rows = parameters.getRowsAmount()
        return Math.ceil(cols * rows * parameters.difficultLevel)
    }

    createState = () => {
        const cols = parameters.getColumnsAmount()
        const rows = parameters.getRowsAmount()
        return{
            board: createMinedBoard(rows, cols, this.minesAmount()),
            won: false,
            lost: false,
            showLvlSel: false,
        }
    }

    openField = (row, column) => {
        const board = cloneBoard(this.state.board)
        openField(board, row, column)
        const lost = hadExplosion(board)
        const won = wonGame(board)

        if (lost) {
            showMines(board)
            Alert.alert('GAME OVER')
        }
        if (won) {
            Alert.alert('CONGRATULATIONS, YOU WON!!!')
        }
        this.setState({board, lost, won})
    }

    onSelect = (row, column) => {
        const board = cloneBoard(this.state.board)
        invertFlag(board, row, column)
        const won = wonGame(board)

        if (won){
            Alert.alert('CONGRATULATIONS, YOU WON!!!')
        }

        this.setState({board, won})
    }


    onLvlSelected = lvl =>{
        parameters.difficultLevel = lvl
        this.setState(this.createState())
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <LevelSelect isVisible={this.state.showLvlSel} 
                    onLvlSel={this.onLvlSelected} 
                    onCancel={() => this.setState({showLvlSel: false})}/>
                <Header flagsLeft = {this.minesAmount() - flagsUsed(this.state.board)}
                    onNewGame={() => this.setState(this.createState())}
                    onFlagPress={() => this.setState({showLvlSel: true})}/>
                <View style={styles.board}>
                    <MineField board={this.state.board}
                    openField={this.openField}
                    onSelect={this.onSelect}/>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    board: {
        alignItems: 'center',
        backgroundColor: '#679B62',
    }
})