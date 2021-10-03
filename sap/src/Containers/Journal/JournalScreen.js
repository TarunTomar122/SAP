import React from 'react';
import {View, Text} from 'react-native';

import styles from './JournalScreenStyles';

class JournalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.home}>
        <Text style={styles.text}>Journal Screen</Text>
      </View>
    );
  }
}

export default JournalScreen;
