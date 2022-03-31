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
import { colorLight, color, size, typography } from '../../theme';

import { getTodaysTasks } from '../../Services/API/task';

import Header from '../../Components/Header';

import Ionicons from 'react-native-vector-icons/Ionicons';

class TrackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      refreshing: false,
      searchTask: '',
      loading: false,
      darkMode: true,
    };
  }

  async componentDidMount() {
    // Fetch tasks from the api
    this.setState({ loading: true });
    const tasks = await getTodaysTasks();
    if (!tasks) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({ loading: false });
    } else {
      this.setState({ tasks, loading: false });
    }

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.refreshScreen();
    });
  }

  componentWillUnmount() {
    try {
      this._unsubscribe();
    } catch (err) { }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    getTodaysTasks().then(tasks => {
      this.setState({ tasks, refreshing: false });
    });
  };

  async refreshScreen() {
    // Fetch tasks from the api
    this.setState({ loading: true });
    const tasks = await getTodaysTasks();
    if (!tasks) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({ loading: false });
    } else {
      this.setState({ tasks, loading: false });
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
    const { searchTask } = this.state;
    const data = this.filterData(searchTask);

    return (
      <View style={this.state.darkMode ? styles.darkHome : styles.lightHome}>
        <Header
          route={{ name: 'Workout' }}
          style={this.state.darkMode ? styles.darkHeader : styles.lightHeader}
          rightIcon="view"
          onRightPress={() => this.props.navigation.navigate('Analysis')}
          titleStyle={this.state.darkMode ? styles.darkText : styles.lightText}
        />
        {this.state.loading ? (
          <ActivityIndicator size="large" color={color.primary} />
        ) : (
          <ScrollView
            style={styles.listView}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            {data.length == 0 && (
              <>
                <Text style={styles.noEntryText}>no entries for today 😏</Text>
              </>
            )}

            {data.map((task, index) => (
              <TouchableOpacity
                key={index}
                style={[this.state.darkMode ? styles.darkTaskContainer : styles.lightTaskContainer, styles.elevation]}
                onPress={() =>
                  this.props.navigation.navigate('TaskDetails', {
                    title: task.taskInfoTaskName,
                  })
                }
                onLongPress={() => {
                  this.props.navigation.navigate('AddReminder', { title: task.taskInfoTaskName, description: 'get up and workout mfker', permanent: false })
                }}
              >
                <View>
                  <Text style={this.state.darkMode ? styles.darkTitle : styles.lightTitle}>{task.taskInfoTaskName}</Text>
                  <Text style={this.state.darkMode ? styles.darkTaskRemainderText : styles.lightTaskRemainderText}>Goal: {task.goal}</Text>
                  <Text style={this.state.darkMode ? styles.darkTaskRemainderText : styles.lightTaskRemainderText}>
                    Remaining: {task.goal - task.count}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )
        }

        <FloatingButton
          onPress={() => this.props.navigation.navigate('AddTask')}
        />
      </View >
    );
  }
}

export default TrackScreen;
