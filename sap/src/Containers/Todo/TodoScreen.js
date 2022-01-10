import React from 'react';
import {
  View, Text, Modal, Pressable, TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import styles from './TodoScreenStyles';

import FloatingButton from '../../Components/FloatingButton';

class TodoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      title: '',
      description: '',
    };
  }

  componentDidMount() { }

  handleSubmit() {


    this.setState({ modalVisible: !this.state.modalVisible, title: '', description: ''});
  }

  render() {
    return (
      <View style={styles.home}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: !this.state.modalVisible })
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={[styles.textInput]}
                placeholder="Title"
                placeholderTextColor="#999999"
                color="#999999"
                onChangeText={text => {
                  this.setState({ title: text });
                }}
                value={this.state.title}
              />
              <TextInput
                style={[styles.textInput]}
                placeholder="Description (Optional)"
                placeholderTextColor="#999999"
                color="#999999"
                multiline={true}
                textAlignVertical="top"
                numberOfLines={1}
                onChangeText={text => {
                  this.setState({ description: text });
                }}
                value={this.state.description}
              />
              <Pressable
                style={[styles.button]}
                onPress={() => this.handleSubmit()}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <FloatingButton
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
        />
      </View>
    );
  }
}

export default TodoScreen;
