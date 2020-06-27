import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import TodayImage from '../../assets/imgs/today.jpg'
import moment from 'moment'
import 'moment/locale/pt-br'
import commomStyles from '../CommomStyles'
import Task from '../components/Task'

export default class TaskList extends Component {
    render() {
        const today = moment().locale('pt-br').format('dddd, D [de] MMMM [de] YYYY')
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.background} source={TodayImage}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <Task desc="Task1" estimateAt={new Date()} />
                    <Task desc="Task2" estimateAt={new Date()} doneAt={new Date()} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    background: {
        flexGrow: 3
    },
    taskList: {
        flexGrow: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'        
    },
    title: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secundary,
        fontSize: 50,
        marginLeft: 20,
        marginEnd: 20
    },
    subTitle: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secundary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    }
})