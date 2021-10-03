import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Header from '../../Components/Header';

import styles from './HomeScreenStyles';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.home}>
        <Text style={styles.text}>Home Screen</Text>
      </View>
    );
  }
}

export default HomeScreen;
