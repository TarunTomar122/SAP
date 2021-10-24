import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import FloatingButton from '../../Components/FloatingButton';

import styles from './TrackScreenStyles';

class TrackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    // Fetch tasks from the api
    this.setState({
      tasks: [
        {title: 'Push Ups', remaining: 18},
        {title: 'Sit Ups', remaining: 0},
      ],
    });
  }

  render() {
    return (
      <View style={styles.home}>
        <View style={styles.listView}>
          {this.state.tasks.map((task, index) => (
            <TouchableOpacity
              key={index}
              style={styles.task}
              onPress={() =>
                this.props.navigation.navigate('TaskDetails', {
                  title: task.title,
                })
              }>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskRemaining}>
                Remaining: {task.remaining}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FloatingButton
          onPress={() => this.props.navigation.navigate('AddTask')}
        />
      </View>
    );
  }
}

export default TrackScreen;
