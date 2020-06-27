import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import commomStyles from '../CommomStyles'

export default props => {
    const doneOrNotStyle = props.doneAt != null ?
                            { textDecorationLine: 'line-through' } : {}
    return(
        <View style={styles.container}>
            <View style={styles.checkContainer}>
                {getCheckView(props.doneAt)}
            </View>
            <View style={styles.taskContainer}>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text>{props.estimateAt + ""}</Text>
            </View>
        </View>
    )
}

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={[styles.circle, styles.done]}>
                <Icon name='check' size={20} color='#FFF'></Icon>
            </View>
        )
    } else{
        return (
            <View style={[styles.circle, styles.pending]}> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
        , borderColor: '#AAA'
        , borderBottomWidth: 1
        , alignItems: 'center'
        , paddingVertical: 10
    }
    , checkContainer: {
        flex: 2
        , alignItems: 'center'
        , justifyContent: 'center'
    }
    , taskContainer: {
        flex: 8
    }
    , circle: {
        height: 25
        , width: 25
        , borderRadius: 13
        , borderWidth: 1
    }
    , pending: {
        borderColor: '#555'
    }
    , done: {
        backgroundColor: '#4D7031'
        , alignItems: 'center'
        , justifyContent: 'center'
    }
    , desc: {
        fontFamily: commomStyles.fontFamily
        , color: commomStyles.colors.mainText
        , fontSize: 15
    }
})