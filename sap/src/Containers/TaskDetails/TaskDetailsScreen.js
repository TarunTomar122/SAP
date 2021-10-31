import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ShadowPropTypesIOS,
  ScrollView,
  Pressable,
} from 'react-native';

import Header from '../../Components/Header';

import styles from './TaskDetailsScreenStyles';

import {addCountTask, getLatestTasks} from '../../Services/API/task';

class TaskDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.route.params.title,
      count: null,
      entries: [],
    };
  }

  async componentDidMount() {
    // Fetch recent entries
    const entries = await getLatestTasks(this.state.title);

    this.setState({entries: entries});
  }

  async submitCount() {
    if (this.state.count == null) {
      console.log('Please enter a count');
      return;
    }

    const done = await addCountTask(this.state.title, this.state.count);
    if (!done) {
      console.log('Failed to add count');
      return;
    } else {
      this.props.navigation.navigate('track');
    }
  }

  render() {
    return (
      <View style={styles.home}>
        <Header
          route={{name: this.state.title}}
          leftIcon={true}
          onLeftPress={() => this.props.navigation.navigate('track')}
        />

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput]}
              placeholder="Count"
              placeholderTextColor="#999999"
              color="#999999"
              onChangeText={text => {
                this.setState({count: text});
              }}
              value={this.state.count}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.submitCount.bind(this)}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.entriesContainer}>
            <Text style={styles.entriesText}>Recent Entries</Text>

            <View style={styles.entries}>
              <ScrollView>
                {this.state.entries.map((entry, index) => {
                  let date = new Date(entry.date);
                  return (
                    <View style={styles.entryContainer} key={index}>
                      <Text style={styles.entryText}>
                        {date.getUTCDate()} : {date.getUTCMonth() + 1} :{' '}
                        {date.getUTCFullYear()}
                      </Text>
                      <Text style={styles.entryText}>Goal : {entry.goal}</Text>
                      <Text style={styles.entryText}>
                        Reached : {entry.count}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default TaskDetailsScreen;
