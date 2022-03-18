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
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
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
            color: (opacity = 1) => `rgba(251,169,40, ${opacity})`, // optional
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
      <View style={styles.home}>
        <Header
          route={{ name: 'add rep' }}
          leftIcon={true}
          onLeftPress={() => this.props.navigation.navigate('track')}
          rightIcon="delete"
          onRightPress={() => this.delete()}
        />

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput]}
              placeholder="Count"
              placeholderTextColor={color.searchText}
              color={color.searchText}
              onChangeText={text => {
                this.setState({ count: text });
              }}
              value={this.state.count}
            />
          </View>
          <Button
            text="Submit"
            style={styles.button}
            onPress={this.submitCount.bind(this)}
          />
        </View>

        <View style={styles.chartView}>
          <Text style={styles.chartText}>
            {this.state.title}
          </Text>
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
