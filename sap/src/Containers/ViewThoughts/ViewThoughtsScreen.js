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

import styles from './ViewThoughtsStyle';
import {color, size, typography} from '../../theme';

import {getThoughts} from '../../Services/API/thought';

import AntDesign from 'react-native-vector-icons/AntDesign';

class AddThoughtScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.name,
      thoughts: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    const response = await getThoughts(this.props.route.params.name);
    if (response) {
      this.setState({
        thoughts: response.thoughts,
        loading: false,
      });
    } else {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <View style={styles.home}>
        <Header
          route={{name: this.state.name}}
          leftIcon={true}
          onLeftPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.container}>
          <ScrollView>
            {this.state.loading ? (
              <ActivityIndicator size="large" color={color.primary} />
            ) : (
              <>
                {this.state.thoughts.length == 0 && (
                  <Text style={styles.noThought}>No Thoughts yet</Text>
                )}
                {this.state.thoughts.map((thought, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.thought}
                    onPress={() =>
                      this.props.navigation.navigate('Thought', {
                        thought: thought,
                      })
                    }>
                    <Text style={styles.thoughtText}>{thought.thought}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.date}>
                        {new Date(thought.date).getDate()}-
                        {new Date(thought.date).getMonth()}-
                        {new Date(thought.date).getFullYear()}
                      </Text>
                      <View style={styles.ratingView}>
                        {
                          // Show a star for the rating
                          [...Array(thought.rating)].map((_, index) => (
                            <AntDesign
                              name="star"
                              size={size.scale(12)}
                              color={color.primary}
                            />
                          ))
                        }
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default AddThoughtScreen;
