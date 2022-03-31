import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native';

import FloatingButton from '../../Components/FloatingButton';
import styles from './PeopleScreenStyles.js';
import { color, size, typography } from '../../theme';

import { getThoughts } from '../../Services/API/thought';

import Header from '../../Components/Header';


class PeopleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchPerson: '',
      refreshing: false,
      journals: [],
      darkMode: true,
    };
  }

  async componentDidMount() {
    // Fetch journals from the api
    this.setState({ loading: true });
    const journals = await getThoughts();
    if (!journals) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({ loading: false });
    } else {
      this.setState({ journals, loading: false });
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
    // Fetch journals from the api
    this.setState({ loading: true });
    const journals = await getThoughts();
    if (!journals) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({ loading: false });
    } else {
      this.setState({ journals, loading: false });
    }
  }

  render() {

    // console.log(this.state.journals)

    return (
      <View style={this.state.darkMode ? styles.darkHome : styles.lightHome}>

        <Header
          route={{ name: 'Journals' }}
          style={this.state.darkMode ? styles.darkHeader : styles.lightHeader}
          leftIcon="write"
          rightIcon="calendar"
          titleStyle={this.state.darkMode ? styles.darkText : styles.lightText}
        />
        <View style={this.state.darkMode ? styles.darkRecentEntriesContainer : styles.lightRecentEntriesContainer}>


          {this.state.loading && (
            <ActivityIndicator size="large" color={color.primary} />
          )}

          {!this.state.loading && (
            <View>
              {this.state.journals.length > 0 && (
                this.state.journals.map((journal, index) => (
                  <TouchableOpacity
                    style={[this.state.darkMode ? styles.darkListCardContainer : styles.lightListCardContainer, styles.elevation]}
                    onPress={() => this.props.navigation.navigate('ViewJournal', {
                      journal
                    })}
                    key={index}
                  >
                    <Text style={this.state.darkMode ? styles.darkListCardDate : styles.lightListCardDate}>
                      {
                        // get the date in the format
                        new Date(journal.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })

                      }
                    </Text>
                    <Text style={this.state.darkMode ? styles.darkListCardTitle : styles.lightListCardTitle}>
                      {journal.title}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}

          <View style={this.state.darkMode ? styles.darkBottomContainer : styles.lightBottomContainer}>
            <TouchableOpacity>
              <Text style={this.state.darkMode ? styles.darkTitle : styles.lightTitle}>
                Today's prompt
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={this.state.darkMode ? styles.darkTitle : styles.lightTitle}>
                Daily Quiz
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={this.state.darkMode ? styles.darkQuote : styles.lightQuote}>
            "The best way to predict the future is to create it"
          </Text>

        </View>

      </View>
    )
  }
}

export default PeopleScreen;
