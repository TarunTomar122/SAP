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
  Alert,
} from 'react-native';

import FloatingButton from '../../Components/FloatingButton';
import styles from './PeopleScreenStyles.js';
import {color, size, typography} from '../../theme';

import {getPeopleList} from '../../Services/API/people';

import Entypo from 'react-native-vector-icons/Entypo';

class PeopleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchPerson: '',
      refreshing: false,
      people: [],
    };
  }

  async componentDidMount() {
    // Fetch people from the api
    this.setState({loading: true});
    const people = await getPeopleList();
    if (!people) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({loading: false});
    } else {
      this.setState({people, loading: false});
    }

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.refreshScreen();
    });
  }

  componentWillUnmount() {
    try {
      this._unsubscribe();
    } catch (err) {}
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    getPeopleList().then(people => {
      this.setState({people, refreshing: false});
    });
  };

  async refreshScreen() {
    // Fetch people from the api
    this.setState({loading: true});
    const people = await getPeopleList();
    if (!people) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      this.setState({loading: false});
    } else {
      this.setState({people, loading: false});
    }
  }

  filterData(searchPerson) {
    try {
      const {people} = this.state;
      const filteredPeople = [];
      people.forEach(person => {
        const tagsForThisPerson = person.tags;
        if (person.name.toLowerCase().includes(searchPerson.toLowerCase())) {
          filteredPeople.push(person);
        } else {
          tagsForThisPerson.forEach(tag => {
            if (tag.name.toLowerCase().includes(searchPerson.toLowerCase())) {
              filteredPeople.push(person);
            }
          });
        }
      });
      return filteredPeople;
    } catch (e) {
      return [];
    }
  }

  render() {
    const {searchPerson} = this.state;
    const data = this.filterData(searchPerson);

    return (
      <View style={styles.home}>
        <View style={styles.searchBar}>
          <TextInput
            style={[styles.textInput]}
            placeholder="search person or tag"
            placeholderTextColor={color.searchText}
            color={color.searchText}
            onChangeText={text => {
              this.setState({searchPerson: text});
            }}
            value={this.state.searchPerson}
          />
        </View>

        {this.state.loading ? (
          <ActivityIndicator size="large" color={color.primary} />
        ) : (
          <ScrollView
            style={styles.listView}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            {data.length == 0 && (
              <>
                <Text style={styles.noEntryText}>
                  You're gonna die alone :(
                </Text>
              </>
            )}
            {data.map((person, index) => (
              <TouchableOpacity
                key={index}
                style={styles.listBox}
                onPress={() =>
                  this.props.navigation.navigate('AddThought', {
                    title: person.name,
                  })
                }>
                <Text style={styles.personName}>{person.name}</Text>
                <View style={styles.tagView}>
                  <Entypo
                    name="price-ribbon"
                    color={color.primary}
                    size={24}
                    style={styles.tagIcon}
                  />
                  <View style={styles.tagListView}>
                    {person.tags.map(tag => (
                      <Text style={styles.tag} key={tag}>
                        {tag.name}
                      </Text>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <FloatingButton
          onPress={() => this.props.navigation.navigate('AddPerson')}
        />
      </View>
    );
  }
}

export default PeopleScreen;
