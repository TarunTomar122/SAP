import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import styles from './AnalysisDetailsScreenStyles';
import {color, size, typography} from '../../theme';

import DropDownPicker from 'react-native-dropdown-picker';

class AnalysisDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'analyse',
      open: false,
      value: '',
      items: [
        {label: 'track', value: 'track'},
        {label: 'people', value: 'people'},
      ],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.home}>
        <Header
          route={{name: this.state.title}}
          leftIcon={true}
          onLeftPress={() => this.props.navigation.navigate('analysis')}
        />
      </View>
    );
  }
}

export default AnalysisDetailsScreen;
