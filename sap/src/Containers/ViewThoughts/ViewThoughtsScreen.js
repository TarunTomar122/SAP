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
import Accordion from 'react-native-collapsible/Accordion';

class AddThoughtScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.name,
      thoughts: [],
      loading: false,
      activeSections: [],
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    const response = await getThoughts(this.props.route.params.name);
    if (response) {
      const thoughts = response.thoughts;
      thoughts.reverse();
      this.setState({
        thoughts: thoughts,
        loading: false,
      });
    } else {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({
        loading: false,
      });
    }
  }

  _renderSectionTitle = section => {
    return null;
  };

  _renderHeader = section => {
    return (
      <View style={[styles.header, styles.elevation]}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View key={section.title} style={styles.elevation}>
        <View style={styles.thought}>
          <Text style={styles.thoughtText}>{section.thought}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.date}>
              {new Date(section.date).getDate()}-
              {new Date(section.date).getMonth()}-
              {new Date(section.date).getFullYear()}
            </Text>
            <View style={styles.ratingView}>
              {
                // Show a star for the rating
                [...Array(section.rating)].map((_, index) => (
                  <AntDesign
                    name="star"
                    size={size.scale(12)}
                    color={color.primary}
                  />
                ))
              }
            </View>
          </View>
        </View>
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({activeSections});
  };

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
                <Accordion
                  sections={this.state.thoughts}
                  activeSections={this.state.activeSections}
                  renderSectionTitle={this._renderSectionTitle}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                  onChange={this._updateSections}
                />
                {/* {this.state.thoughts.map((thought, index) => (
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
                ))} */}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default AddThoughtScreen;
