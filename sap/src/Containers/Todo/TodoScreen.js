import React from 'react';
import {
  View, Text, Modal, Pressable, TouchableOpacity,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Animated,
  ToastAndroid,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './TodoScreenStyles';
import { color, colorLight, size, typography } from '../../theme';

import Header from '../../Components/Header';

import { addTodo, getTodos, deleteTodo } from '../../Services/API/todo';

import SwipeableFlatList from 'react-native-swipeable-list';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

class TodoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      title: '',
      description: '',
      loading: false,
      todos: [],
      backgroundColor: '#fff',
      darkMode: true,
    };
  }

  async componentDidMount() {

    this.refreshScreen();

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.refreshScreen();
    });

  }

  async refreshScreen() {
    this.setState({ loading: true });
    const response = await getTodos();
    if (response) {
      this.setState({
        todos: response.data,
        loading: false,
      });
    } else {
      this.setState({ loading: false });
      ToastAndroid.show('Error', ToastAndroid.SHORT);
    }
  }

  async handleSubmit() {

    const { title, description } = this.state;

    if (title.length === 0) {
      ToastAndroid.show('Title is required', ToastAndroid.SHORT);
      return;
    }

    this.setState({ loading: true });

    const response = await addTodo({ title, description });

    if (response) {
      this.refreshScreen();
      this.setState({
        modalVisible: false,
        title: '',
        description: '',
        loading: false,
      });
    } else {
      this.setState({ modalVisible: false, loading: false });
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }

  }

  ListItem(todo) {
    const { title, description, date } = todo
    return (
      <Animated.View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Animated.View>
    )

  }

  handleDelete(title) {
    this.setState({ loading: true });
    deleteTodo({ title })
      .then(() => {
        this.refreshScreen();
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
        ToastAndroid.show('Error', ToastAndroid.SHORT);
      });
  }

  QuickActions(index, item) {
    return (
      <View style={styles.qaContainer}>
        <View style={[styles.iconView]}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AddReminder', { title: item.title, description: item.description, permanent: false })}>
            <Ionicons name="alarm-outline" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={[styles.iconView]}>
          <TouchableOpacity onPress={() => this.handleDelete(item.title)}>
            <AntDesign name="delete" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {

    return (
      <View style={this.state.darkMode ? styles.darkHomeContainer : styles.lightHomeContainer}>

        <Header
          route={{ name: 'Notes' }}
          style={this.state.darkMode ? styles.darkHeader : styles.lightHeader}
          rightIcon="add"
          onRightPress={() => this.setState({ modalVisible: true })}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: !this.state.modalVisible })
          }}
        >
          <TouchableWithoutFeedback onPress={() => {
            this.setState({ modalVisible: !this.state.modalVisible })
          }}>
            <View style={styles.centeredView}>
              <View style={[styles.modalView, this.state.darkMode ? { backgroundColor: color.background } : { backgroundColor: color.text }]}>
                <Text style={this.state.darkMode ? styles.darkModalTitle : styles.lightModalTitle}>Add Note</Text>
                <TextInput
                  style={[styles.textInput]}
                  placeholder="Title"
                  placeholderTextColor={color.darkGrey}
                  color={color.lightGrey}
                  onChangeText={text => {
                    this.setState({ title: text });
                  }}
                  value={this.state.title}
                />
                <TextInput
                  style={[styles.textInput]}
                  placeholder="Description (Optional)"
                  placeholderTextColor={color.darkGrey}
                  color={color.lightGrey}
                  multiline={true}
                  textAlignVertical="top"
                  numberOfLines={1}
                  onChangeText={text => {
                    this.setState({ description: text });
                  }}
                  value={this.state.description}
                />
                <Pressable
                  style={[styles.button, { backgroundColor: color.background }]}
                  onPress={() => this.handleSubmit()}
                  disabled={this.state.loading}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <SafeAreaView style={styles.container}>
          {this.state.loading && (
            <ActivityIndicator size="large" color={color.primary} />
          )}
          <SwipeableFlatList
            style={{ flex: 1, width: "100%" }}
            keyExtractor={(item, index) => index.toString()}
            maxSwipeDistance={180}
            data={this.state.todos}
            renderItem={(todo) => this.ListItem(todo.item)}
            renderQuickActions={({ index, item }) => this.QuickActions(index, item)}
            contentContainerStyle={styles.contentContainerStyle}
            shouldBounceOnMount={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>

      </View >
    );
  }
}

export default TodoScreen;
