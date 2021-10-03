import React from 'react';
import {View, Text} from 'react-native';

import styles from './TodoScreenStyles';

class TodoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.home}>
        <Text style={styles.text}>Todo Screen</Text>
      </View>
    );
  }
}

export default TodoScreen;
