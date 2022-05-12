import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from 'react-native';

import Header from '../../Components/Header';

import styles from './ViewJournalStyles';
import { color, colorLight, size, typography } from '../../theme';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { getJournal } from "../../Services/API/journal"

class ViewJournalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      darkMode: true,
      journal: {},
      data: this.props.route.params.data,
    };
  }

  async componentDidMount() {

    const response = await getJournal(this.props.route.params.data);
    if (response) {
      this.setState({
        loading: false,
        journal: response,
      });
    } else {
      this.setState({
        loading: false,
      });
      ToastAndroid.show('Error fetching journal', ToastAndroid.SHORT);
    }

  }


  render() {
    return (
      <ScrollView style={this.state.darkMode ? styles.darkHome : styles.lightHome}>

        <View style={this.state.darkMode ? styles.darkHeader : styles.lightHeader}>


          {this.state.loading && (
            <ActivityIndicator size="large" color={color.primary} />
          )}

          {!this.state.loading && (
            <ScrollView style={{ paddingBottom: size.scale(80) }}>

              <View style={this.state.darkMode ? styles.darkTagsContainer : styles.lightTagsContainer}>
                <Text style={this.state.darkMode ? styles.darkTagsText : styles.lightHeaderText}>
                  {new Date(this.state.journal.date).toISOString().slice(0, 10)}
                </Text>
              </View>

              <Text style={this.state.darkMode ? styles.darkHeaderText : styles.lightHeaderText}>
                My thoughts
              </Text>

              <Text style={this.state.darkMode ? styles.darkContentText : styles.lightContentText}>
                {this.state.journal.answers[0]}
              </Text>

              <Text style={this.state.darkMode ? styles.darkHeaderText : styles.lightHeaderText}>
                Things i wanted to change
              </Text>

              <Text style={this.state.darkMode ? styles.darkContentText : styles.lightContentText}>
                {this.state.journal.answers[1]}
              </Text>

              <Text style={this.state.darkMode ? styles.darkHeaderText : styles.lightHeaderText}>
                Things that i was worried of
              </Text>

              <Text style={this.state.darkMode ? styles.darkContentText : styles.lightContentText}>
                {this.state.journal.answers[2]}
              </Text>

              <Text style={this.state.darkMode ? styles.darkHeaderText : styles.lightHeaderText}>
                Things that i was grateful for
              </Text>

              <Text style={this.state.darkMode ? styles.darkContentText : styles.lightContentText}>
                {this.state.journal.answers[3]}
              </Text>



            </ScrollView>
          )}



        </View>

      </ScrollView>
    );
  }
}

export default ViewJournalScreen;

