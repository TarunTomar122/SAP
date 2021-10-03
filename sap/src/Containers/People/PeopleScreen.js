import React from 'react';
import {View, Text} from 'react-native';

import styles from './PeopleScreenStyles.js';

class PeopleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.home}>
        <Text style={styles.text}>People Screen</Text>
      </View>
    );
  }
}

export default PeopleScreen;
