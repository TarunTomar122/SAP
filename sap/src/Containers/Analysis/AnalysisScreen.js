import React from 'react';
import { View, Text, ToastAndroid, ActivityIndicator, TouchableOpacity } from 'react-native';

import Button from '../../Components/Button';
import styles from './AnalysisScreenStyles';
import { color, size, typography } from '../../theme';

import DropDownPicker from 'react-native-dropdown-picker';

import { ContributionGraph } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

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

class AnalysisScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      lastDate: null,
      loading: false,
      open: false,
      value: 'track',
      items: [
        { label: 'track', value: 'track' },
        { label: 'people', value: 'people' },
      ],
    };
  }


  saveResponseToData(res) {
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

      lastDate = new Date();
      // set year to 2000
      lastDate.setFullYear(date.getFullYear() + 1);

      data.push({ date: dateString, count: count });
    }
    this.setState({ data: data, lastDate: lastDate, loading: false });
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await getContribAnalysis();
    if (res) {
      this.saveResponseToData(res);
    } else {
      ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <View style={styles.home}>
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

        {!this.state.loading && (
          <TouchableOpacity style={styles.button} onPress={() => {
            if (this.state.value === '') {
              ToastAndroid.show('Please select an option', ToastAndroid.SHORT);
              return;
            }
            this.props.navigation.navigate('analysisDetails', {
              option: this.state.value,
            });
          }}>
            <Text style={styles.buttonText}>Analyse -> </Text>
          </TouchableOpacity>
        )}

      </View>
    );
  }
}

export default AnalysisScreen;
