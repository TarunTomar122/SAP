import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Header from '../../Components/Header';
import Button from '../../Components/Button';
import styles from './AddTaskScreenStyles';
import { colorLight, color, size, typography } from '../../theme';

import { getTasks, addTask } from '../../Services/API/task';


class AddTaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      goal: null,
      modalVisible: true,
      data: [],
      loading: false,
      darkMode: true,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const tasks = await getTasks();
    if (tasks) {
      let taskNames = [];
      for (let task in tasks) {
        taskNames.push(tasks[task].taskName);
      }
      this.setState({ data: taskNames, loading: false });
    } else {
      this.setState({ loading: false });
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  }

  async addTodayTask() {
    this.setState({ loading: true });
    if (this.state.taskName == null || this.state.goal == null) {
      ToastAndroid.show('Invalid Details', ToastAndroid.SHORT);
      this.setState({ loading: false });
      return;
    }
    const done = await addTask(this.state.taskName, this.state.goal);
    if (!done) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({ loading: false });
    } else {
      this.props.navigation.navigate('track');
    }
  }

  filterData(taskName) {
    try {
      return this.state.data.filter(item =>
        item.includes(taskName.toLowerCase()),
      );
    } catch (e) {
      return [];
    }
  }


  render() {
    const { taskName } = this.state;

    return (
      <View style={this.state.darkMode ? styles.darkHome : styles.lightHome}>
        <Header
          route={{ name: 'Add workout' }}
          style={this.state.darkMode ? styles.darkHeader : styles.lightHeader}
          titleStyle={this.state.darkMode ? styles.darkTitle : styles.lightTitle}
        />

        <View style={[styles.container]}>

          <TextInput
            style={this.state.darkMode ? [styles.darkTextInput, styles.elevation] : styles.lightTextInput}
            placeholder="Workout name"
            placeholderTextColor={colorLight.darkGrey}
            onChangeText={taskName => this.setState({ taskName })}
            value={taskName}
          />

          <View>
            <Text style={this.state.darkMode ? styles.darkSText : styles.lightSuggestionText}>Suggestions</Text>
            {this.state.loading ? (
              <ActivityIndicator size="large" color={color.primary} />
            ) : (
              <View style={this.state.darkMode ? styles.darkSuggestionContainer : styles.lightSuggestionContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {this.filterData(taskName).map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => this.setState({ taskName: item })}
                      style={this.state.darkMode ? styles.darkSuggestion : styles.lightSuggestion}
                    >
                      <Text style={this.state.darkMode ? styles.darkSuggestionText : styles.lightSuggestionText}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <TextInput
            style={this.state.darkMode ? [styles.darkTextInput, styles.elevation] : styles.lightTextInput}
            placeholder="Goal"
            placeholderTextColor={colorLight.darkGrey}
            onChangeText={goal => this.setState({ goal })}
            value={this.state.goal}
          />

          <Button
            text="Add"
            onPress={() => this.addTodayTask()}
            style={this.state.darkMode ? styles.darkButton : styles.lightButton}
            textStyle={this.state.darkMode ? styles.darkButtonText : styles.lightButtonText}
          />
        </View>
      </View>
    );
  }

}

export default AddTaskScreen;
