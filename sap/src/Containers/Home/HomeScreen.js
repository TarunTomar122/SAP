import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './HomeScreenStyles';
import { color, size, typography } from '../../theme';

import Header from '../../Components/Header';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
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

  }


  render() {
    return (
      <View style={styles.home}>
        <Header
          route={{ name: 'home' }}
          style={styles.header}
          rightIcon="profile"
          onRightPress={() => this.props.navigation.navigate('Profile')}
        />
        <View style={styles.container}>
          <Text style={styles.text}>Work in progress</Text>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
