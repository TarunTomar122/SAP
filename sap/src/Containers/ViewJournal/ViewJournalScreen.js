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

class ViewJournalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      journal: this.props.route.params.journal,
      darkMode: true,
    };
  }

  async componentDidMount() {
  }


  render() {
    return (
      <ScrollView style={this.state.darkMode ? styles.darkHome : styles.lightHome}>

        <View style={this.state.darkMode ? styles.darkHeader : styles.lightHeader}>
          <Text style={this.state.darkMode ? styles.darkHeaderText : styles.lightHeaderText}>
            {this.state.journal.title}
          </Text>
          <Text style={this.state.darkMode ? styles.darkHeaderDate : styles.lightHeaderDate}>
            {new Date(this.state.journal.date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text>

        </View>

        <View style={this.state.darkMode ? styles.darkContentContainer : styles.lightContentContainer}>
          <Text style={this.state.darkMode ? styles.darkContentText : styles.lightContentText}>
            {this.state.journal.thought}
          </Text>
        </View>

        <View style={this.state.darkMode ? styles.darkTagsContainer : styles.lightTagsContainer}>
          <AntDesign style={this.state.darkMode ? styles.darkTagsIcon : styles.lightTagsIcon} name="tags" size={size.scale(22)} color={color.primary} />
          <Text style={this.state.darkMode ? styles.darkTagsText : styles.lightTagsText}>
            {this.state.journal.personName}
          </Text>

          {
            this.state.journal.rating == 1 && (
              <MaterialCommunityIcons
                style={this.state.darkMode ? styles.darkTagsIcon : styles.lightTagsIcon}
                name="emoticon-dead-outline"
                size={size.scale(22)}
                color={color.primary}
              />
            )
          }

          {
            this.state.journal.rating == 2 && (
              <MaterialCommunityIcons
                style={this.state.darkMode ? styles.darkTagsIcon : styles.lightTagsIcon}
                name="emoticon-sad-outline"
                size={size.scale(22)}
                color={color.primary}
              />
            )
          }

          {
            this.state.journal.rating == 3 && (
              <MaterialCommunityIcons
                style={this.state.darkMode ? styles.darkTagsIcon : styles.lightTagsIcon}
                name="emoticon-neutral-outline"
                size={size.scale(22)}
                color={color.primary}
              />
            )
          }

          {
            this.state.journal.rating == 4 && (
              <MaterialCommunityIcons
                style={this.state.darkMode ? styles.darkTagsIcon : styles.lightTagsIcon}
                name="emoticon-happy-outline"
                size={size.scale(22)}
                color={color.primary}
              />
            )
          }

          {
            this.state.journal.rating == 5 && (
              <MaterialCommunityIcons
                style={this.state.darkMode ? styles.darkTagsIcon : styles.lightTagsIcon}
                name="emoticon-excited-outline"
                size={size.scale(22)}
                color={color.primary}
              />
            )
          }


        </View>

      </ScrollView>
    );
  }
}

export default ViewJournalScreen;
