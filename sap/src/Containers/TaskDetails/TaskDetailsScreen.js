import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  RefreshControl,
} from 'react-native';

import Header from '../../Components/Header';

import styles from './TaskDetailsScreenStyles';
import {color, size, typography} from '../../theme';

import {
  addCountTask,
  getLatestTasks,
  deleteTask,
} from '../../Services/API/task';

class TaskDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.route.params.title,
      count: null,
      entries: [],
      loading: false,
      refreshing: false,
    };
  }

  async componentDidMount() {
    // Fetch recent entries
    this.setState({loading: true});
    const entries = await getLatestTasks(this.state.title);
    if (entries) {
      this.setState({entries: entries, loading: false});
    } else {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({loading: false});
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    getLatestTasks(this.state.title).then(entries => {
      this.setState({entries, refreshing: false});
    });
  };

  async submitCount() {
    this.setState({loading: true});
    if (this.state.count == null) {
      ToastAndroid.show('Invalid Count', ToastAndroid.SHORT);
      this.setState({loading: false});
      return;
    }

    const done = await addCountTask(this.state.title, this.state.count);
    if (!done) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({loading: false});
      return;
    } else {
      this.props.navigation.navigate('track');
    }
  }

  async delete() {
    this.setState({loading: true});
    const done = await deleteTask(this.state.title);
    if (done) {
      this.props.navigation.navigate('track');
    } else {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({loading: false});
    }
  }

  render() {
    return (
      <View style={styles.home}>
        <Header
          route={{name: this.state.title}}
          leftIcon={true}
          onLeftPress={() => this.props.navigation.navigate('track')}
          rightIcon={true}
          onRightPress={() => this.delete()}
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
          {this.state.loading && (
            <View>
              <ActivityIndicator size="large" color={color.primary} />
            </View>
          )}

          <View style={styles.entriesContainer}>
            <Text style={styles.entriesText}>Recent Entries</Text>

            {this.state.loading ? (
              <ActivityIndicator size="large" color={color.primary} />
            ) : (
              <View style={styles.entries}>
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                    />
                  }>
                  {this.state.entries.map((entry, index) => {
                    let date = new Date(entry.date);
                    return (
                      <View style={styles.entryContainer} key={index}>
                        <Text style={styles.entryText}>
                          {date.getUTCDate()} : {date.getUTCMonth() + 1} :{' '}
                          {date.getUTCFullYear()}
                        </Text>
                        <Text style={styles.entryText}>
                          Goal : {entry.goal}
                        </Text>
                        <Text style={styles.entryText}>
                          Reached : {entry.count}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default TaskDetailsScreen;
