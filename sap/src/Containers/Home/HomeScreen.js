import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

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

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 50,
  },
});

export default HomeScreen;
