import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import styles from './PeopleScreenStyles.js';
import { color, size, typography } from '../../theme';

import Header from '../../Components/Header';
import { Calendar } from 'react-native-calendars';

import { getRandomEntry, getMonthlyData } from "../../Services/API/journal"

class PeopleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      darkMode: true,
      randomEntry: false,
      markedDates: {}
    };
  }

  async componentDidMount() {

    console.log(new Date().toISOString().slice(0, 10))

    var today = new Date();
    // this month 
    var thisMonth = today.getMonth();
    // this year
    var thisYear = today.getFullYear();

    const response = await getMonthlyData({ month: thisMonth, year: thisYear });

    if (response) {

      var data = response.data;
      var markedDates = [];

      for (var i = 0; i < data.length; i++) {

        var backgroundColor = '#fff';
        var rating = data[i].rating;
        // based on the rating value, set the background color
        if (rating <= 1) {
          backgroundColor = '#222222';
        } else if (rating <= 2) {
          backgroundColor = '#223343';
        } else if (rating <= 3) {
          backgroundColor = '#2C4D6E';
        } else if (rating <= 4) {
          backgroundColor = '#376899';
        } else {
          backgroundColor = '#4183C4';
        }

        markedDates[data[i].date] = {
          customStyles: {
            container: {
              backgroundColor: backgroundColor,
              opacity: 0.5
            },
            text: {
              color: 'black',
              fontWeight: 'bold'
            }
          },
        }
      }

      this.setState({ markedDates })

    } else {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }


    const randomEntry = await getRandomEntry();
    if (randomEntry) {
      this.setState({
        loading: false,
        randomEntry: randomEntry
      })
    } else {
      this.setState({
        loading: false,
        randomEntry: {}
      });
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }


    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.refreshScreen();
    });
  }

  componentWillUnmount() {
    try {
      this._unsubscribe();
    } catch (err) { }
  }

  async refreshScreen() {

    this.setState({ loading: true })

    const randomEntry = await getRandomEntry();

    if (randomEntry) {

      this.setState({
        loading: false,
        randomEntry: randomEntry
      })
    } else {
      this.setState({
        loading: false,
        randomEntry: {}
      });
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  }

  getDaysAgo(randomEntry) {
    const today = new Date();
    const entryDate = new Date(randomEntry.date);
    const diffTime = Math.abs(today.getTime() - entryDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  render() {

    return (
      <View style={this.state.darkMode ? styles.darkHome : styles.lightHome}>

        <Header
          route={{ name: 'Journals' }}
          style={this.state.darkMode ? styles.darkHeader : styles.lightHeader}
          leftIcon="write"
          rightIcon="calendar"
          onLeftPress={() => this.props.navigation.navigate('AddJournal')}
          titleStyle={this.state.darkMode ? styles.darkText : styles.lightText}
        />


        {this.state.loading && (
          <ActivityIndicator size="large" color={color.primary} />
        )}

        <View style={this.state.darkMode ? styles.darkFactContainer : styles.lightFactContainer}>

          {this.state.randomEntry && (
            <>
              <Text style={this.state.darkMode ? styles.darkFactTitle : styles.lightFactTitle}>
                {this.getDaysAgo(this.state.randomEntry) == 1 ?
                  this.getDaysAgo(this.state.randomEntry) + ' day ago' :
                  this.getDaysAgo(this.state.randomEntry) + ' days ago'}
              </Text>
              <Text style={this.state.darkMode ? styles.darkFactText : styles.lightFactText}>
                {
                  // generate a random number between 0 and 4
                  this.state.randomEntry.answers[Math.floor(Math.random() * 4)]
                }
              </Text>
            </>
          )}


          <Calendar
            theme={{
              backgroundColor: color.background,
              calendarBackground: color.background,
            }}
            // Initially visible month. Default = now
            // current={new Date().toISOString().slice(0, 10)}
            // current={"2022-05-11"}
            onDayPress={data => {

              var dateString = data.dateString;

              // if dateString is not in the markedDates array, navigate to the AddJournal screen
              if (!this.state.markedDates[dateString]) {
                return;
              }

              this.props.navigation.navigate('ViewJournal', { data })
            }}
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={async (data) => {

              var month = data.month - 1;
              var year = data.year;

              const response = await getMonthlyData({ month: month, year: year });

              if (response) {

                var data = response.data;
                var markedDates = [];

                for (var i = 0; i < data.length; i++) {

                  var backgroundColor = '#fff';
                  var rating = data[i].rating;
                  // based on the rating value, set the background color
                  if (rating <= 1) {
                    backgroundColor = '#222222';
                  } else if (rating <= 2) {
                    backgroundColor = '#223343';
                  } else if (rating <= 3) {
                    backgroundColor = '#2C4D6E';
                  } else if (rating <= 4) {
                    backgroundColor = '#376899';
                  } else {
                    backgroundColor = '#4183C4';
                  }

                  markedDates[data[i].date] = {
                    customStyles: {
                      container: {
                        backgroundColor: backgroundColor,
                        opacity: 0.5
                      },
                      text: {
                        color: 'black',
                        fontWeight: 'bold'
                      }
                    },
                  }
                }

                this.setState({ markedDates })

              } else {
                ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
              }


            }}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            disableAllTouchEventsForDisabledDays={true}
            // Replace default month and year title with custom one. the function receive a date as parameter
            renderHeader={date => {
              /*Return JSX*/
              return (
                <View style={styles.header}>
                  <Text style={{ color: color.primary }}>
                    {(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)} / {date.getFullYear()}
                  </Text>
                </View>
              );
            }}
            enableSwipeMonths={true}
            markingType={'custom'}
            markedDates={this.state.markedDates}
          // markedDates={{
          //   '2022-05-10': {
          //     customStyles: {
          //       container: {
          //         backgroundColor: 'green',
          //         opacity: 0.5
          //       },
          //       text: {
          //         color: 'black',
          //         fontWeight: 'bold'
          //       }
          //     },
          //   },
          // }}
          />

        </View>




      </View>
    )
  }
}

export default PeopleScreen;
