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

class TaskDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.route.params.title,
      entries: [
        {date: Date.now(), target: 20, count: 18},
        {date: Date.now(), target: 20, count: 18},
        {date: Date.now(), target: 20, count: 18},
        {date: Date.now(), target: 20, count: 18},
        {date: Date.now(), target: 20, count: 18},
        {date: Date.now(), target: 20, count: 18},
        {date: Date.now(), target: 20, count: 18},
      ],
    };
  }

  componentDidMount() {}

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
                this.setState({taskName: text});
              }}
              value={this.state.taskName}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log(this.state)}>
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
                      <Text style={styles.entryText}>
                        Target : {entry.target}
                      </Text>
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
