import React from 'react'
import { View
    , Text
    , StyleSheet
    , TouchableWithoutFeedback
    , TouchableOpacity } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'
import commomStyles from '../CommomStyles'
import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {
    const doneOrNotStyle = props.doneAt != null ?
                            { textDecorationLine: 'line-through' } : {}
    
    const dateFormated = moment(props.doneAt? props.doneAt : props.estimateAt)
        .locale('pt-br')
        .format('dddd, D [de] MMMM [de] YYYY')
        
    const getRightContent = () => {
        return(
            <TouchableOpacity 
                style={styles.right}
                onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={30} color='#FFF' />
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return(
            <View style={styles.left}>
                <Icon name="trash" size={20} color='#FFF' style={styles.excludeIcon} />
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }

    return(
        <Swipeable 
            renderRightActions={getRightContent}
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => props.toogleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.taskContainer}>
                    <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                    <Text style={[styles.date, doneOrNotStyle]}>{dateFormated}</Text>
                </View>
            </View>
        </Swipeable>
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
        , backgroundColor: '#FFF'
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
    , date: {
        fontFamily: commomStyles.fontFamily
        , color: commomStyles.colors.subText        
    }
    , right: {
        backgroundColor: 'red'
        , flexDirection: 'row'
        , alignItems: 'center'
        , justifyContent: 'flex-end'
        , paddingHorizontal: 20
    }
    , left: {
        backgroundColor: 'red'
        , flexDirection: 'row'
        , alignItems: 'center'
        , flex: 1
    }
    , excludeText: {
        fontFamily: commomStyles.fontFamily
        , color: '#FFF'
        , fontSize: 20
        , margin: 10
    }
    , excludeIcon: {
        marginLeft: 10
    }
})