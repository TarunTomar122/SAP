import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import FloatingButton from '../../Components/FloatingButton';

import styles from './TrackScreenStyles';

class TrackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.home}>
        <FloatingButton onPress={() => console.log('I am pressed')} />
      </View>
    );
  }
}

export default TrackScreen;
