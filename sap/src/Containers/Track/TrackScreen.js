import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
} from 'react-native';

import FloatingButton from '../../Components/FloatingButton';

import styles from './TrackScreenStyles';

import {getTodaysTasks} from '../../Services/API/task';

class TrackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      refreshing: false,
      searchTask: '',
    };
  }

  async componentDidMount() {
    // Fetch tasks from the api
    const tasks = await getTodaysTasks();
    this.setState({tasks});

    this.list = [
      this.props.navigation.addListener('didFocus', () => {
        console.log('Focusing Screen again');
        this.refreshScreen();
      }),
    ];
  }

  componentWillUnmount() {
    try {
      this.list.forEach(item => item.remove());
    } catch (er) {}
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    getTodaysTasks().then(tasks => {
      this.setState({tasks, refreshing: false});
    });
  };

  async refreshScreen() {
    // Fetch tasks from the api
    const tasks = await getTodaysTasks();
    this.setState({tasks});
  }

  filterData(searchTask) {
    try {
      return this.state.tasks.filter(item =>
        item.taskInfoTaskName.includes(searchTask.toLowerCase()),
      );
    } catch (e) {
      return [];
    }
  }

  render() {
    const {searchTask} = this.state;
    const data = this.filterData(searchTask);

    return (
      <View style={styles.home}>
        <View style={styles.searchBar}>
          <TextInput
            style={[styles.textInput]}
            placeholder="Search task"
            placeholderTextColor="#999999"
            color="#999999"
            onChangeText={text => {
              this.setState({searchTask: text});
            }}
            value={this.state.searchTask}
          />
        </View>

        <ScrollView
          style={styles.listView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          {data.map((task, index) => (
            <TouchableOpacity
              key={index}
              style={styles.task}
              onPress={() =>
                this.props.navigation.navigate('TaskDetails', {
                  title: task.taskInfoTaskName,
                })
              }>
              <Text style={styles.taskTitle}>{task.taskInfoTaskName}</Text>
              <Text style={styles.taskRemaining}>Goal: {task.goal}</Text>
              <Text style={styles.taskRemaining}>
                Remaining: {task.goal - task.count}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FloatingButton
          onPress={() => this.props.navigation.navigate('AddTask')}
        />
      </View>
    );
  }
}

export default TrackScreen;
