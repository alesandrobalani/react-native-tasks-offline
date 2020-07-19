import React,  { Component } from 'react'
import {
    Modal
    , View
    , StyleSheet
    , TouchableWithoutFeedback
    , Text
    , TextInput
    , TouchableOpacity
    , Platform
} from 'react-native'
import commomStyles from '../CommomStyles'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import 'moment/locale/pt-br'

const initialState = { 
    desc:''
    , date: new Date() 
    , showDatePicker: false
}
export default class AddTask extends Component {
    state = {
        ...initialState
    }

    save = () => {
        this.props.onSave && this.props.onSave(
            {
                date: this.state.date
                , desc: this.state.desc
            })    
        this.setState({ ...initialState })
    }

    getDatePicker = () => {
        let datePicker =  <DateTimePicker
            value={this.state.date}
            onChange={(_, date) => this.setState({ date, showDatePicker: false })}
            mode='date' />
        
        if (Platform.OS === 'android') {
            const dateString = moment(this.state.date).locale('pt-br').format('dddd, D [de] MMMM [de] YYYY')
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={styles.dateStyle}>{dateString}</Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        
        return datePicker
    }

    render() {
        return(
            <Modal
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                    <TouchableWithoutFeedback
                        onPress={this.props.onCancel}>
                            <View style={styles.background}></View>
                    </TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <Text style={styles.header}>Nova Tarefa</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Informe a descrição"
                            value={this.state.desc}
                            onChangeText={desc => this.setState({ desc })} />
                        {this.getDatePicker()}
                        <View style={styles.buttonsArea}>
                            <TouchableOpacity onPress={this.props.onCancel}>
                                <Text style={styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.save}>
                                <Text style={styles.button}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                        <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1
        , backgroundColor: 'rgba(0, 0, 0, 0.7)'
    }
    , container: {
        backgroundColor: '#FFF'
    }
    , header: {
        fontFamily: commomStyles.fontFamily
        , backgroundColor: commomStyles.colors.today
        , color: commomStyles.colors.secundary
        , textAlign: 'center'
        , padding: 18
        , fontSize: 18
    }
    , buttonsArea: {
        flexDirection: 'row'
        , justifyContent: 'flex-end'
        , alignItems: 'center'
    }
    , input: {
        fontFamily: commomStyles.fontFamily
        , margin: 15
        , height: 40
        , backgroundColor: '#FFF'
        , borderWidth: 1
        , borderColor: '#E3E3E3'
        , borderRadius: 3
    }
    , button: {
        margin: 20
        , marginRight: 30
        , color: commomStyles.colors.today
    }
    , dateStyle: {
        fontFamily: commomStyles.fontFamily
        , margin: 15
    }
})