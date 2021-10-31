import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

import Header from '../../Components/Header';
import Autocomplete from 'react-native-autocomplete-input';

import styles from './AddTaskScreenStyles';
import {color, size, typography} from '../../theme';

import {getTasks, addTask} from '../../Services/API/task';

class AddTaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: null,
      goal: null,
      modalVisible: true,
      data: ['pushups', 'situps', 'something'],
    };
  }

  async componentDidMount() {
    const tasks = await getTasks();
    if (tasks) {
      let taskNames = [];
      for (let task in tasks) {
        taskNames.push(tasks[task].taskName);
      }
      this.setState({data: taskNames});
    }
  }

  async addTodayTask() {
    if (this.state.taskName == null || this.state.goal == null) {
      console.log('Invalid Details');
      return;
    }
    const done = await addTask(this.state.taskName, this.state.goal);
    if (!done) {
      console.log('Something Went Wrong');
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
    const {taskName} = this.state;
    const data = this.filterData(taskName);

    return (
      <View style={styles.home}>
        <Header
          route={{name: 'add task'}}
          leftIcon={true}
          onLeftPress={() => this.props.navigation.navigate('track')}
        />

        <View style={styles.container}>
          <View style={styles.autocompleteContainer}>
            <Autocomplete
              data={data}
              value={taskName == null ? null : taskName.toLocaleLowerCase()}
              onChangeText={text =>
                this.setState({
                  taskName: text.toLocaleLowerCase(),
                  modalVisible: true,
                })
              }
              placeholder="Task name"
              placeholderTextColor={color.lightGrey}
              style={styles.autocomplete}
              flatListProps={{
                keyExtractor: (_, idx) => idx,
                renderItem: ({item}) => {
                  if (this.state.modalVisible == false) {
                    return null;
                  }

                  return (
                    <TouchableOpacity
                      style={styles.suggestionBox}
                      onPress={() => {
                        this.setState({taskName: item});
                        this.setState({modalVisible: false});
                      }}>
                      <Text style={styles.suggestionText}>{item}</Text>
                    </TouchableOpacity>
                  );
                },
              }}
            />

            <TextInput
              style={[styles.textInput]}
              placeholder="Today's Goal"
              placeholderTextColor="#999999"
              color="#999999"
              onChangeText={text => {
                this.setState({goal: text});
              }}
              value={this.state.goal}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.addTodayTask.bind(this)}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default AddTaskScreen;
