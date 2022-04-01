import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  TouchableWithoutFeedback,
  Modal, Pressable,
} from 'react-native';

import FloatingButton from '../../Components/FloatingButton';
import styles from './PeopleScreenStyles.js';
import { color, size, typography } from '../../theme';

import { getThoughts, addThought } from '../../Services/API/thought';

import Header from '../../Components/Header';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class PeopleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loading: false,
      searchPerson: '',
      refreshing: false,
      journals: [],
      darkMode: true,
      rating: '',
      thought: '',
      title: '',
      tag: '',
      tags: [],
    };
  }

  async componentDidMount() {
    // Fetch journals from the api
    this.setState({ loading: true });
    const response = await getThoughts();
    if (!response) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({ loading: false });
    } else {
      const { journals, tags } = response;
      journals.reverse();

      // keep the name of the tags in the tags array
      const tagsArray = [];
      tags.forEach(item => {
        tagsArray.push(item.name);
      });

      this.setState({ journals, loading: false, tags: tagsArray });
    }

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
    // Fetch journals from the api
    this.setState({ loading: true });
    const response = await getThoughts();
    if (!response) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({ loading: false });
    } else {
      const { journals, tags } = response;
      journals.reverse();
      // keep the name of the tags in the tags array
      const tagsArray = [];
      tags.forEach(item => {
        tagsArray.push(item.name);
      });

      this.setState({ journals, loading: false, tags: tagsArray });
    }
  }


  async handleSubmit() {

    this.setState({ loading: true });
    const { thought, rating, tag, title } = this.state;
    const response = await addThought({ name: tag, thought, rating, title });
    if (response) {
      this.setState({ loading: false, modalVisible: false });
    } else {
      this.setState({ loading: false });
      ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
    }

  }


  filterData(tag) {
    try {
      return this.state.tags.filter(item =>
        item.includes(tag.toLowerCase()),
      );
    } catch (e) {
      return [];
    }
  }

  render() {

    // console.log(this.state.journals)

    return (
      <View style={this.state.darkMode ? styles.darkHome : styles.lightHome}>

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
              <ScrollView style={[styles.modalView, this.state.darkMode ? { backgroundColor: color.background } : { backgroundColor: color.text }]}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={this.state.darkMode ? styles.darkModalTitle : styles.lightModalTitle}>Write your heart out.</Text>
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
                    placeholder="Thoughts"
                    placeholderTextColor={color.darkGrey}
                    color={color.lightGrey}
                    multiline={true}
                    textAlignVertical="top"
                    numberOfLines={1}
                    onChangeText={text => {
                      this.setState({ thought: text });
                    }}
                    value={this.state.thought}
                  />

                  <TextInput
                    style={[styles.textInput]}
                    placeholder="tag"
                    placeholderTextColor={color.darkGrey}
                    color={color.lightGrey}
                    onChangeText={text => {
                      this.setState({ tag: text });
                    }}
                    value={this.state.tag}
                  />

                  <View style={this.state.darkMode ? styles.darkSuggestionContainer : styles.lightSuggestionContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {this.filterData(this.state.tag).map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => this.setState({ tag: item })}
                          style={this.state.darkMode ? styles.darkSuggestion : styles.lightSuggestion}
                        >
                          <Text style={this.state.darkMode ? styles.darkSuggestionText : styles.lightSuggestionText}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={this.state.darkMode ? styles.darkIconContainer : styles.lightIconContainer}>
                    <TouchableOpacity
                      style={this.state.darkMode ? styles.darkIcon : styles.lightIcon}
                      onPress={() => {
                        this.setState({ rating: 1 })
                      }}
                    >
                      <MaterialCommunityIcons
                        style={this.state.darkMode ? styles.darkTagsIcon : styles.lightTagsIcon}
                        name="emoticon-dead-outline"
                        size={size.scale(30)}
                        color={this.state.rating == 1 ? color.primary : color.lightGrey}
                      />

                    </TouchableOpacity>

                    <TouchableOpacity
                      style={this.state.darkMode ? styles.darkIcon : styles.lightIcon}
                      onPress={() => {
                        this.setState({ rating: 2 })
                      }}
                    >
                      <MaterialCommunityIcons
                        style={this.state.darkMode ? styles.darkTagsIcon : styles.lightTagsIcon}
                        name="emoticon-sad-outline"
                        size={size.scale(30)}
                        color={this.state.rating == 2 ? color.primary : color.lightGrey}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={this.state.darkMode ? styles.darkIcon : styles.lightIcon}
                      onPress={() => {
                        this.setState({ rating: 3 })
                      }}
                    >
                      <MaterialCommunityIcons
                        style={this.state.darkMode ? styles.darkTagsIcon : styles.lightTagsIcon}
                        name="emoticon-neutral-outline"
                        size={size.scale(30)}
                        color={this.state.rating == 3 ? color.primary : color.lightGrey}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={this.state.darkMode ? styles.darkIcon : styles.lightIcon}
                      onPress={() => {
                        this.setState({ rating: 4 })
                      }}
                    >
                      <MaterialCommunityIcons
                        style={this.state.darkMode ? styles.darkTagsIcon : styles.lightTagsIcon}
                        name="emoticon-happy-outline"
                        size={size.scale(30)}
                        color={this.state.rating == 4 ? color.primary : color.lightGrey}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={this.state.darkMode ? styles.darkIcon : styles.lightIcon}
                      onPress={() => {
                        this.setState({ rating: 5 })
                      }}
                    >
                      <MaterialCommunityIcons
                        style={this.state.darkMode ? styles.darkTagsIcon : styles.lightTagsIcon}
                        name="emoticon-excited-outline"
                        size={size.scale(30)}
                        color={this.state.rating == 5 ? color.primary : color.lightGrey}
                      />
                    </TouchableOpacity>

                  </View>


                  <Pressable
                    style={[styles.button, { backgroundColor: color.background }]}
                    onPress={() => this.handleSubmit()}
                    disabled={this.state.loading}
                  >
                    <Text style={styles.textStyle}>Submit</Text>
                  </Pressable>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>


        <Header
          route={{ name: 'Journals' }}
          style={this.state.darkMode ? styles.darkHeader : styles.lightHeader}
          leftIcon="write"
          rightIcon="calendar"
          onLeftPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
          titleStyle={this.state.darkMode ? styles.darkText : styles.lightText}
        />
        <View style={this.state.darkMode ? styles.darkRecentEntriesContainer : styles.lightRecentEntriesContainer}>


          {this.state.loading && (
            <ActivityIndicator size="large" color={color.primary} />
          )}

          {!this.state.loading && (
            <View>

              <Text style={this.state.darkMode ? styles.darkQuote : styles.lightQuote}>
                "The best way to predict the future is to create it"
              </Text>
              {this.state.journals.length > 0 && (
                this.state.journals.map((journal, index) => (
                  <TouchableOpacity
                    style={[this.state.darkMode ? styles.darkListCardContainer : styles.lightListCardContainer, styles.elevation]}
                    onPress={() => this.props.navigation.navigate('ViewJournal', {
                      journal
                    })}
                    key={index}
                  >
                    <Text style={this.state.darkMode ? styles.darkListCardDate : styles.lightListCardDate}>
                      {
                        // get the date in the format
                        new Date(journal.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })

                      }
                    </Text>
                    <Text style={this.state.darkMode ? styles.darkListCardTitle : styles.lightListCardTitle}>
                      {journal.title}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}

          <View style={this.state.darkMode ? styles.darkBottomContainer : styles.lightBottomContainer}>
            <TouchableOpacity>
              <Text style={this.state.darkMode ? styles.darkTitle : styles.lightTitle}>
                Today's prompt
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={this.state.darkMode ? styles.darkTitle : styles.lightTitle}>
                Daily Quiz
              </Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
    )
  }
}

export default PeopleScreen;
