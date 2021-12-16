import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import styles from './AnalysisDetailsScreenStyles';
import {color, size, typography} from '../../theme';
import DropDownPicker from 'react-native-dropdown-picker';
import {getTasksInfo} from '../../Services/API/analysis';

import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
      legend: ['Rainy Days'], // optional
    },
    {
      data: [23, 33, 23, 23, 23, 33],
      color: (opacity = 1) => `rgba(26, 255, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
      legend: ['Not rainy days'], // optional
    },
  ],
  legend: ['Rainy Days', 'not rainy days'], // optional
};

class AnalysisDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.route.params.option,
      tasks: {},
      data: null,
      fopen: false,
      fvalue: '',
      fitems: [],
      sopen: false,
      svalue: '',
      sitems: [
        {
          label: 'past 1 week',
          value: 'past 1 week',
        },
        {
          label: 'past 15 days',
          value: 'past 15 days',
        },
        {
          label: 'past 1 month',
          value: 'past 1 month',
        },
      ],
    };
  }

  async componentDidMount() {
    const response = await getTasksInfo();
    if (response) {
      const result = response.data.result;
      const tasks = {};

      const taskNames = [];

      for (let i = 0; i < result.length; i++) {
        const taskName = result[i].taskName;
        const dataArr = result[i].taskObjArr;
        taskNames.push({label: taskName, value: taskName});
        tasks[taskName] = dataArr;
      }

      this.setState({tasks: tasks, fitems: taskNames});
    } else {
      ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
    }
    console.log(this.state.tasks);
  }

  applyFilters = () => {
    const {fvalue, svalue} = this.state;

    if (fvalue === '' || svalue === '') {
      ToastAndroid.show('Please select filters', ToastAndroid.SHORT);
      return;
    }

    const {tasks} = this.state;
    const taskDataArr = tasks[fvalue];

    var past = 0;

    if (svalue === 'past 1 week') {
      past = 7;
    } else if (svalue === 'past 15 days') {
      past = 15;
    } else if (svalue === 'past 1 month') {
      past = 30;
    }

    const validData = taskDataArr.slice(0, past);
    console.log(taskDataArr.slice(0, past));

    const labels = [];
    const goals = [];
    const achieved = [];

    for (let i = 0; i < validData.length; i++) {
      var label = validData[i].date;
      label =
        label.slice(0, 10).split(' ')[2] +
        '-' +
        label.slice(0, 10).split(' ')[1];
      labels.push(label);

      goals.push(validData[i].goal);
      achieved.push(validData[i].achieved);
    }

    const data = {
      labels: labels,
      datasets: [
        {
          data: goals,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
        {
          data: achieved,
          color: (opacity = 1) => `rgba(26, 255, 244, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
      ],
      legend: ['Goals', 'Achieved'], // optional
    };

    this.setState({data: data});
  };

  render() {
    return (
      <ScrollView style={styles.home}>
        <Header
          route={{name: this.state.title}}
          leftIcon={true}
          onLeftPress={() => this.props.navigation.navigate('analysis')}
        />

        <View style={styles.filters}>
          <DropDownPicker
            open={this.state.fopen}
            value={this.state.fvalue}
            items={this.state.fitems}
            setOpen={open => this.setState({fopen: open})}
            setValue={value => {
              this.setState({fvalue: value()});
            }}
            setItems={items => {
              this.setState({fitems: items()});
            }}
            style={[styles.pickerContainer, styles.elevation]}
            textStyle={[styles.pickerText]}
            dropDownContainerStyle={[styles.pickerDropDown, styles.elevation]}
            listMode="SCROLLVIEW"
            listItemContainerStyle={{
              height: size.scale(50),
            }}
            dropDownDirection="BOTTOM"
            itemSeparator={true}
            itemSeparatorStyle={[
              {
                backgroundColor: '#999999',
                opacity: 0.4,
              },
              styles.elevation,
            ]}
            labelStyle={{borderRadius: 5, borderColor: 'white'}}
          />
          <DropDownPicker
            open={this.state.sopen}
            value={this.state.svalue}
            items={this.state.sitems}
            setOpen={open => this.setState({sopen: open})}
            setValue={value => {
              this.setState({svalue: value()});
            }}
            setItems={items => {
              this.setState({sitems: items()});
            }}
            style={[styles.pickerContainer, styles.elevation]}
            textStyle={[styles.pickerText]}
            dropDownContainerStyle={[styles.pickerDropDown, styles.elevation]}
            listMode="SCROLLVIEW"
            listItemContainerStyle={{
              height: size.scale(50),
            }}
            dropDownDirection="BOTTOM"
            itemSeparator={true}
            itemSeparatorStyle={[
              {
                backgroundColor: '#999999',
                opacity: 0.4,
              },
              styles.elevation,
            ]}
            labelStyle={{borderRadius: 5, borderColor: 'white'}}
          />

          <Button text="Apply" onPress={this.applyFilters.bind(this)} />
        </View>
        <View style={styles.chartView}>
          {this.state.data && (
            <LineChart
              data={this.state.data}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
          )}
        </View>
      </ScrollView>
    );
  }
}

export default AnalysisDetailsScreen;
