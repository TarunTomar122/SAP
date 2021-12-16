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

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

import {LineChart, BarChart} from 'react-native-chart-kit';

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

class AnalysisDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.route.params.option,
      tasks: {},
      data: null,
      fopen: false,
      pickedChart: 1,
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
    let taskDataArr = tasks[fvalue];

    const sorted_by_name = taskDataArr.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) {
        return 1;
      } else {
        return -1;
      }
    });

    var past = 0;

    if (svalue === 'past 1 week') {
      past = 7;
    } else if (svalue === 'past 15 days') {
      past = 15;
    } else if (svalue === 'past 1 month') {
      past = 30;
    }

    let validData = sorted_by_name.slice(
      Math.max(0, sorted_by_name.length - past),
      sorted_by_name.length,
    );

    const labels = [];
    const goals = [];
    const achieved = [];

    for (let i = 0; i < validData.length; i++) {
      var label = validData[i].date;
      label = label.slice(0, 10).split(' ')[2];
      labels.push(label);

      goals.push(validData[i].goal);
      achieved.push(validData[i].achieved);
    }

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

          <Button
            text="Apply"
            onPress={this.applyFilters.bind(this)}
            textStyle={{color: 'white'}}
          />

          <View style={styles.chatPickerContainer}>
            <TouchableOpacity onPress={() => this.setState({pickedChart: 1})}>
              {this.state.pickedChart === 1 ? (
                <AntDesign name="linechart" color={color.primary} size={40} />
              ) : (
                <AntDesign name="linechart" color={color.text} size={40} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({pickedChart: 2})}>
              {this.state.pickedChart === 2 ? (
                <FontAwesome name="bar-chart" color={color.primary} size={40} />
              ) : (
                <FontAwesome name="bar-chart" color={color.text} size={40} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.chartView}>
          {this.state.pickedChart === 1 && (
            <>
              {this.state.data && (
                <LineChart
                  data={this.state.data}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                />
              )}
            </>
          )}
          {this.state.pickedChart === 2 && (
            <>
              {this.state.data && (
                <BarChart
                  // style={graphStyle}
                  data={this.state.data}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  verticalLabelRotation={30}
                />
              )}
            </>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default AnalysisDetailsScreen;
