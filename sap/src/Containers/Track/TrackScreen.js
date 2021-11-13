import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native';

import FloatingButton from '../../Components/FloatingButton';

import styles from './TrackScreenStyles';
import {color, size, typography} from '../../theme';

import {getTodaysTasks} from '../../Services/API/task';

class TrackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      refreshing: false,
      searchTask: '',
      loading: false,
    };
  }

  async componentDidMount() {
    // Fetch tasks from the api
    this.setState({loading: true});
    const tasks = await getTodaysTasks();
    if (!tasks) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({loading: false});
    } else {
      this.setState({tasks, loading: false});
    }

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.refreshScreen();
    });
  }

  componentWillUnmount() {
    try {
      this._unsubscribe();
    } catch (err) {}
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    getTodaysTasks().then(tasks => {
      this.setState({tasks, refreshing: false});
    });
  };

  async refreshScreen() {
    // Fetch tasks from the api
    this.setState({loading: true});
    const tasks = await getTodaysTasks();
    if (!tasks) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({loading: false});
    } else {
      this.setState({tasks, loading: false});
    }
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
            placeholderTextColor={color.searchText}
            color={color.searchText}
            onChangeText={text => {
              this.setState({searchTask: text});
            }}
            value={this.state.searchTask}
          />
        </View>

        {this.state.loading ? (
          <ActivityIndicator size="large" color={color.primary} />
        ) : (
          <ScrollView
            style={styles.listView}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            {data.length == 0 && (
              <>
                <Text style={styles.noEntryText}>No entries for today :(</Text>
              </>
            )}

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
        )}

        <FloatingButton
          onPress={() => this.props.navigation.navigate('AddTask')}
        />
      </View>
    );
  }
}

export default TrackScreen;
