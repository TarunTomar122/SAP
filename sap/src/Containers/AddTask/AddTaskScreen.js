import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ShadowPropTypesIOS,
  Modal,
  Pressable,
} from 'react-native';

import Header from '../../Components/Header';

import styles from './AddTaskScreenStyles';

class AddTaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: null,
      dailyGoal: null,
      color: 'orange',
      modalVisible: false,
      colors: [
        'orange',
        'red',
        'blue',
        'skyblue',
        'green',
        'yellow',
        'lightgreen',
        'magenta',
        'pink',
        'purple',
        'black',
        'white',
      ],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.home}>
        <Header
          route={{name: 'add task'}}
          leftIcon={true}
          onLeftPress={() => this.props.navigation.navigate('track')}
        />

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput]}
              placeholder="Task Name"
              placeholderTextColor="#999999"
              color="#999999"
              onChangeText={text => {
                this.setState({taskName: text});
              }}
              value={this.state.taskName}
            />
            <TouchableOpacity
              onPress={() => this.setState({modalVisible: true})}
              style={styles.dot}>
              <View
                style={{
                  ...styles.colorPicker,
                  backgroundColor: this.state.color,
                }}></View>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.textInput]}
            placeholder="Today's Goal"
            placeholderTextColor="#999999"
            color="#999999"
            onChangeText={text => {
              this.setState({dailyGoal: text});
            }}
            value={this.state.dailyGoal}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log(this.state)}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Choose Color</Text>
              <View style={styles.colorPickerContainer}>
                {this.state.colors.map((color, index) => {
                  if (index > 5) {
                    return;
                  }

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        this.setState({color: color, modalVisible: false});
                      }}>
                      <View
                        style={{
                          ...styles.colorPickerItem,
                          backgroundColor: color,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.colorPickerContainer}>
                {this.state.colors.map((color, index) => {
                  if (index < 6) {
                    return;
                  }

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        this.setState({color: color, modalVisible: false});
                      }}>
                      <View
                        style={{
                          ...styles.colorPickerItem,
                          backgroundColor: color,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default AddTaskScreen;
