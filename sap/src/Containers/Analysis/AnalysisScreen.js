import React from 'react';
import {View, Text, ToastAndroid} from 'react-native';

import Button from '../../Components/Button';
import styles from './AnalysisScreenStyles';
import {color, size, typography} from '../../theme';

import DropDownPicker from 'react-native-dropdown-picker';

class AnalysisScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <Text style={styles.text}>What do you wanna analyse right now...?</Text>
        <DropDownPicker
          open={this.state.open}
          value={this.state.value}
          items={this.state.items}
          setOpen={open => this.setState({open: open})}
          setValue={value => {
            this.setState({value: value()});
          }}
          setItems={items => {
            this.setState({items: items()});
          }}
          style={[styles.pickerContainer, styles.elevation]}
          textStyle={[styles.pickerText]}
          dropDownContainerStyle={[styles.pickerDropDown, styles.elevation]}
          listMode="SCROLLVIEW"
          listItemContainerStyle={{
            height: size.scale(50),
          }}
          dropDownDirection="BOTTOM"
          itemSeparator={true}
          itemSeparatorStyle={[
            {
              backgroundColor: '#999999',
              opacity: 0.4,
            },
            styles.elevation,
          ]}
          labelStyle={{borderRadius: 5, borderColor: 'white'}}
        />
        <Button
          text="Analyse"
          style={{marginVertical: size.scale(30)}}
          onPress={() => {
            if (this.state.value === '') {
              ToastAndroid.show('Please select an option', ToastAndroid.SHORT);
              return;
            }
            this.props.navigation.navigate('analysisDetails', {
              option: this.state.value,
            });
          }}
        />
      </View>
    );
  }
}

export default AnalysisScreen;
