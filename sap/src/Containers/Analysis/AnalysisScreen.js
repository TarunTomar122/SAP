import React from 'react';
import { View, Text, ToastAndroid, ActivityIndicator, TouchableOpacity } from 'react-native';

import Button from '../../Components/Button';
import styles from './AnalysisScreenStyles';
import { color, size, typography } from '../../theme';

import { ContributionGraph } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

import { getContribAnalysis } from '../../Services/API/analysis';

import Header from '../../Components/Header';

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
      darkMode: true,
    };
  }


  saveResponseToData(res) {
    const result = res.data.mainTemp;

    let data = [];
    let lastDate = null;
    for (let key in result) {
      let date = new Date(key+" 2020 00:00:00 GMT+0530 (India Standard Time)");
      console.log(key, date, new Date("Tue Apr 19 2020 00:00:00 GMT+0530 (India Standard Time)"));
      var dateString = date.toDateString();
      if (date.getMonth() == '11') {
        // Convert date into a string
        dateString =
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate();
      }
      else {
        // console.log(date.getMonth());
        if (date.getMonth() < 10) {
          if (date.getDate() < 10) {
            dateString =
              date.getFullYear() + 1 +
              '-0' +
              (date.getMonth() + 1) +
              '-0' +
              date.getDate();
          } else {
            dateString =
              date.getFullYear() + 1 +
              '-0' +
              (date.getMonth() + 1) +
              '-' +
              date.getDate();
          }
        } else {
          if (date.getDate() < 10) {
            dateString =
              date.getFullYear() + 1 +
              '-' +
              (date.getMonth() + 1) +
              '-0' +
              date.getDate();
          } else {
            dateString =
              date.getFullYear() + 1 +
              '-' +
              (date.getMonth() + 1) +
              '-' +
              date.getDate();

          }
        }
      }


      let count = result[key];

      // round off the count to 2 decimal
      count = Math.round(count * 10000) / 10000;

      lastDate = new Date();
      // set year to 2000
      lastDate.setFullYear(date.getFullYear() + 1);
      // lastDate = dateString;
      data.push({ date: dateString, count: count });
    }

    console.log("data", data, lastDate);

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
      <View style={this.state.darkMode ? styles.darkHome : styles.lightHome}>

        <Header
          route={{ name: 'Workout analysis' }}
          style={this.state.darkMode ? styles.darkHeader : styles.lightHeader}
          titleStyle={this.state.darkMode ? styles.darkHeaderTitle : styles.lightHeaderTitle}
        />

        <View style={styles.contribCont}>

          {this.state.loading && (
            <ActivityIndicator size="large" color={color.primary} />
          )}

          {this.state.data && (
            <View style={this.state.darkMode ? styles.darkChartView : styles.lightChartView}>
              <ContributionGraph
                values={this.state.data}
                endDate={this.state.lastDate}
                numDays={91}
                width={screenWidth * 0.99}
                height={220}
                chartConfig={chartConfig}
              // style={this.state.darkMode ? this.state.darkChartView : this.state.lightChartView}
              />
              <Text style={this.state.darkMode ? styles.darkContribText : lightContribText}>
                {this.state.data.length} / 91 days of contribution 🙂
              </Text>
            </View>
          )}
        </View>

        {/* {!this.state.loading && (
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
        )} */}

      </View>
    );
  }
}

export default AnalysisScreen;
