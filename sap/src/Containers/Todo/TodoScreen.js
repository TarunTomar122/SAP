import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

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

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d2025',
  },
  text: {
    fontSize: 50,
    color: 'white',
  },
});

export default TodoScreen;
