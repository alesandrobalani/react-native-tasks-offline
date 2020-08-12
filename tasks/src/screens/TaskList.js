import React, { Component } from 'react'
import { 
    View
    , Text
    , ImageBackground
    , StyleSheet
    , FlatList
    , TouchableOpacity
    , Platform
    , Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import TodayImage from '../../assets/imgs/today.jpg'
import moment from 'moment'
import 'moment/locale/pt-br'
import commomStyles from '../CommomStyles'
import Task from '../components/Task'
import AddTask from '../Modals/AddTask'

const initialTasks = [
    {
        id: Math.random()
        , desc: 'Task Um'
        , estimateAt: new Date()
    }
    , {
        id: Math.random()
        , desc: 'Task Dois'
        , estimateAt: new Date()
        , doneAt: new Date()    
    }
]

export default class TaskList extends Component {
    state = {
        showDoneTasks: true        
        ,tasks: [...initialTasks]
        , visibleTasks: [...initialTasks]
        , visibleAddTask: false
        , showDoneTasks: true
    }

    toogleTask = id => {
        const tasks = [...this.state.tasks]
        const taskFiltered = tasks.filter(t => t.id == id)[0]
        taskFiltered.doneAt = taskFiltered.doneAt ? null : new Date()
        this.setState({ tasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = [...this.state.tasks]
        if (!this.state.showDoneTasks)
            visibleTasks = visibleTasks.filter(t => t.doneAt == null)
        this.setState({ visibleTasks })
    }

    toggleDoneItems = () => {            
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    onCancelAddTask = () => {
        this.setState({ visibleAddTask: false })
    }

    showAddTask = () => {
        this.setState({ visibleAddTask: true })
    }

    addTask = newTask => {
        if (!newTask
            || !newTask.desc
            || !newTask.desc.trim()) {
                Alert.alert('Dados inválidos. Task ou descrição vazia')
                return
            }
        
        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random()
            , desc: newTask.desc
            , estimateAt: newTask.date
            , doneAt: null
        })
        this.setState({ tasks, visibleAddTask: false }, this.filterTasks)
    }

    deleteTask = (id) => {
        let tasks = [...this.state.tasks]
        tasks = tasks.filter(t => t.id != id)
        this.setState( { tasks }, this.filterTasks)
    }

    render() {
        const today = moment().locale('pt-br').format('dddd, D [de] MMMM [de] YYYY')
        return(
            <View style={styles.container}>
                <AddTask 
                    isVisible={this.state.visibleAddTask}
                    onCancel={this.onCancelAddTask}
                    onSave={this.addTask} />
                <ImageBackground style={styles.background} source={TodayImage}>
                    <View style={styles.iconBar}> 
                        <TouchableOpacity onPress={this.toggleDoneItems}>
                            <Icon 
                                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20}
                                color={commomStyles.colors.secundary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTasks}
                        style={styles.flatList}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} toogleTask={this.toogleTask} onDelete={this.deleteTask} />} />
                </View>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={this.showAddTask}>
                    <Icon 
                        name="plus" 
                        size={20}
                        color={commomStyles.colors.secundary}></Icon>
                </TouchableOpacity>
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
    , flatList: {
        flex: 1
    }
    , iconBar: {
        flexDirection: 'row'        
        , marginHorizontal: 20
        , justifyContent: 'flex-end'
        , marginTop: Platform.OS === 'ios' ? 40 : 10
    }
    , addButton: {
        position: 'absolute'
        , right: 30
        , bottom: 30
        , width: 50
        , height:50
        , borderRadius: 25
        , backgroundColor: commomStyles.colors.today
        , justifyContent: 'center'
        , alignItems: 'center'
    }
})