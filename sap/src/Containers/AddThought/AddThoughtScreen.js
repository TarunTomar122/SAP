import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from 'react-native';

import Header from '../../Components/Header';

import styles from './AddThoughtStyles';
import {color, size, typography} from '../../theme';

import {addThought} from '../../Services/API/thought';

class AddThoughtScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.title,
      thought: '',
      loading: false,
    };
  }

  async componentDidMount() {}

  async addThought() {
    this.setState({loading: true});
    const {thought, rating, name} = this.state;
    const response = await addThought({name, thought, rating});
    if (response) {
      this.setState({loading: false});
      ToastAndroid.show('Thought Added', ToastAndroid.SHORT);
      this.props.navigation.goBack();
    } else {
      this.setState({loading: false});
      ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <View style={styles.home}>
        <Header
          route={{name: this.state.name}}
          leftIcon={true}
          onLeftPress={() => this.props.navigation.goBack()}
          rightIcon="view"
          onRightPress={() =>
            this.props.navigation.navigate('ViewThoughts', {
              name: this.state.name,
            })
          }
        />
        <View style={styles.container}>
          <TextInput
            style={styles.textBox}
            placeholder="Enter your thoughts..."
            placeholderTextColor={color.description}
            multiline={true}
            textAlignVertical="top"
            numberOfLines={8}
            textColor={color.text}
            onChangeText={text => this.setState({thought: text})}
            value={this.state.thought}
          />
          <TextInput
            style={[styles.ratingBox]}
            value={this.state.rating}
            onChangeText={text => this.setState({rating: text})}
            placeholder="Rating"
            placeholderTextColor={color.description}
            textColor={color.text}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.addThought.bind(this)}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          {this.state.loading && (
            <View>
              <ActivityIndicator size="large" color={color.primary} />
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default AddThoughtScreen;
