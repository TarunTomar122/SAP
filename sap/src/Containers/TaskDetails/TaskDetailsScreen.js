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
import Button from '../../Components/Button';
import styles from './TaskDetailsScreenStyles';
import { color, size, typography } from '../../theme';

import {
  addCountTask,
  getLatestTasks,
  deleteTask,
} from '../../Services/API/task';

import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

import { LineChart, BarChart } from 'react-native-chart-kit';

const chartConfig = {
  backgroundGradientFrom: '#183140',
  backgroundGradientFromOpacity: 0.3,
  backgroundGradientTo: '#183140',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(108, 198, 68, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

class TaskDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.route.params.title,
      count: null,
      entries: [],
      loading: true,
      refreshing: false,
      data: null,
      darkMode: true,
    };
  }

  async componentDidMount() {
    // Fetch recent entries
    const entries = await getLatestTasks(this.state.title);
    if (entries) {

      const labels = [];
      const goals = [];
      const achieved = [];

      var i = 0;

      entries.forEach(entry => {

        if (i >= 12) {
          return;
        }
        var label = entry.date;
        label = label.split('-')[2];
        labels.push(label);
        goals.push(entry.goal);
        achieved.push(entry.count);
        i++;
      })

      // reverse the arrays
      labels.reverse();
      goals.reverse();
      achieved.reverse();

      const data = {
        labels: labels,
        datasets: [
          {
            data: goals,
            color: (opacity = 1) => `rgba(221,51,51, ${opacity})`, // optional
            strokeWidth: 2, // optional
          },
          {
            data: achieved,
            color: (opacity = 1) => `rgba(0, 191, 221, ${opacity})`, // optional
            strokeWidth: 4, // optional
          },
        ],
        legend: ['Goals', 'Achieved'], // optional
        barColors: ['#dfe4ea', '#ced6e0'],
      };

      this.setState({ data: data, loading: false });

    } else {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({ loading: false });
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    getLatestTasks(this.state.title).then(entries => {
      this.setState({ entries, refreshing: false });
    });
  };

  async submitCount() {
    this.setState({ loading: true });
    if (this.state.count == null) {
      ToastAndroid.show('Invalid Count', ToastAndroid.SHORT);
      this.setState({ loading: false });
      return;
    }

    const done = await addCountTask(this.state.title, this.state.count);
    if (!done) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({ loading: false });
      return;
    } else {
      this.props.navigation.navigate('track');
    }
  }

  async delete() {
    this.setState({ loading: true });
    const done = await deleteTask(this.state.title);
    if (done) {
      this.props.navigation.navigate('track');
    } else {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <View style={this.state.darkMode ? styles.darkHome : styles.lightHome}>

        <Header
          route={{ name: 'Add rep' }}
          style={this.state.darkMode ? styles.darkHeader : styles.lightHeader}
          titleStyle={this.state.darkMode ? styles.darkHeaderTitle : styles.lightHeaderTitle}
          rightIcon="delete"
          onRightPress={() => this.delete()}
        />

        <View style={styles.container}>
          <Text style={this.state.darkMode ? styles.darkTitle : styles.lightTitle}>
            {this.state.title}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={this.state.darkMode ? styles.darkInput : styles.lightInput}
              placeholder="Count"
              placeholderTextColor={color.darkGrey}
              color={color.searchText}
              onChangeText={text => {
                this.setState({ count: text });
              }}
              value={this.state.count}
            />
          </View>
          <Button
            text="Add"
            style={this.state.darkMode ? styles.darkButton : styles.lightButton}
            onPress={this.submitCount.bind(this)}
          />
        </View>

        <View style={this.state.darkMode ? styles.darkChartView : styles.lightChartView}>
          {this.state.loading ? (
            <ActivityIndicator size="large" color={color.primary} />
          ) : (
            <LineChart
              data={this.state.data}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
          )}

        </View>
      </View>
    );
  }
}

export default TaskDetailsScreen;
