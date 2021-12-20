import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import { ContributionGraph } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

import styles from './HomeScreenStyles';
import { color, size, typography } from '../../theme';

import { getContribAnalysis } from '../../Services/API/analysis';

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(108, 198, 68, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      lastDate: null,
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await getContribAnalysis();
    if (res) {
      const result = res.data.mainTemp;

      let data = [];
      let lastDate = null;

      for (let key in result) {
        let date = new Date(key);

        // Convert date into a string
        let dateString =
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate();

        let count = result[key];

        // round off the count to 2 decimal
        count = Math.round(count * 10000) / 10000;

        lastDate = date;

        data.push({ date: dateString, count: count });
      }
      this.setState({ data: data, lastDate, loading: false });
    } else {
      ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <ScrollView style={styles.home}>
        <View style={styles.contribCont}>
          <Text style={styles.WorkoutHeadingText}>
            Workout Contribution Graph
          </Text>

          {this.state.loading && (
            <ActivityIndicator size="large" color={color.primary} />
          )}

          {this.state.data && (
            <ContributionGraph
              values={this.state.data}
              endDate={this.state.lastDate}
              numDays={91}
              width={screenWidth * 0.99}
              height={220}
              chartConfig={chartConfig}
              style={styles.graphStyles}
            />
          )}
        </View>
      </ScrollView>
    );
  }
}

export default HomeScreen;
