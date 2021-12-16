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
import Autocomplete from 'react-native-autocomplete-input';
import Button from '../../Components/Button';
import styles from './AddPersonScreenStyles';
import {color, size, typography} from '../../theme';

import {getTags, addPerson} from '../../Services/API/people';

class AddPersonScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      totalTags: [],
      email: '',
      contacts: [],
      contactString: '',
      address: '',
      dob: '',
      selectedTags: [],
      tagName: '',
      loading: false,
      modalVisible: false,
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    const tags = await getTags();
    console.log(tags);
    if (tags) {
      this.setState({totalTags: tags, loading: false});
    } else {
      this.setState({loading: false});
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  }

  async addPerson() {
    this.setState({loading: true});
    const {name, email, contactString, address, dob, selectedTags} = this.state;
    const contacts = contactString.split(' ');
    const data = {
      name,
      email,
      contacts: contacts,
      address,
      dob,
      tags: selectedTags,
    };
    const response = await addPerson(data);
    if (response) {
      this.setState({loading: false});
      ToastAndroid.show('Person added successfully', ToastAndroid.SHORT);
      this.props.navigation.goBack();
    } else {
      this.setState({loading: false});
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  }

  filterData(tagName) {
    try {
      return this.state.totalTags.filter(item =>
        item.name.includes(tagName.toLowerCase()),
      );
    } catch (e) {
      return [];
    }
  }

  render() {
    const {tagName} = this.state;
    const filteredData = this.filterData(tagName);

    return (
      <View style={styles.home}>
        <Header
          route={{name: 'add person'}}
          leftIcon={true}
          onLeftPress={() => this.props.navigation.navigate('people')}
        />

        <View style={styles.container}>
          <ScrollView style={styles.autocompleteContainer}>
            <Autocomplete
              data={filteredData}
              value={tagName == null ? null : tagName.toLowerCase()}
              onChangeText={text =>
                this.setState({
                  tagName: text.toLocaleLowerCase(),
                  modalVisible: true,
                })
              }
              onSubmitEditing={() => {
                this.setState({modalVisible: false});
                // Set this tag into the list of selectedTags
                this.setState({
                  selectedTags: [...this.state.selectedTags, tagName],
                  tagName: '',
                });
              }}
              placeholder="Tags"
              placeholderTextColor={color.lightGrey}
              style={styles.autocomplete}
              flatListProps={{
                keyExtractor: (_, idx) => idx,
                renderItem: ({item}) => {
                  if (this.state.modalVisible == false) {
                    return null;
                  }

                  return (
                    <TouchableOpacity
                      style={styles.suggestionBox}
                      onPress={() => {
                        // Add item to selectedTags if not exists
                        if (this.state.selectedTags.indexOf(item.name) == -1) {
                          this.setState({
                            selectedTags: [
                              ...this.state.selectedTags,
                              item.name,
                            ],
                            tagName: '',
                            modalVisible: false,
                          });
                        }
                      }}>
                      <Text style={styles.suggestionText}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                },
              }}
            />
            {this.state.selectedTags.length > 0 && (
              <View style={styles.selectedTagsContainer}>
                {this.state.selectedTags.map((item, index) => (
                  <View style={styles.selectedTagListItemContainer} key={index}>
                    <Text style={styles.selectedTagText}>{item}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          selectedTags: this.state.selectedTags.filter(
                            selectedTag => selectedTag !== item,
                          ),
                        });
                      }}>
                      <Text style={styles.removeTagText}>X</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
            <TextInput
              style={[styles.textInput]}
              placeholder="Name"
              placeholderTextColor="#999999"
              color="#999999"
              onChangeText={text => {
                this.setState({name: text});
              }}
              value={this.state.name}
            />
            <TextInput
              style={[styles.textInput]}
              placeholder="Email"
              placeholderTextColor="#999999"
              color="#999999"
              onChangeText={text => {
                this.setState({email: text});
              }}
              value={this.state.email}
            />
            <TextInput
              style={[styles.textInput]}
              placeholder="Address"
              placeholderTextColor="#999999"
              color="#999999"
              onChangeText={text => {
                this.setState({address: text});
              }}
              value={this.state.address}
            />

            <TextInput
              style={[styles.textInput]}
              placeholder="Birthdate"
              placeholderTextColor="#999999"
              color="#999999"
              onChangeText={text => {
                this.setState({dob: text});
              }}
              value={this.state.dob}
            />

            <TextInput
              style={[styles.textInput]}
              placeholder="Contacts"
              placeholderTextColor="#999999"
              color="#999999"
              onChangeText={text => {
                this.setState({contactString: text});
              }}
              value={this.state.contactString}
            />

            <Button
              style={styles.button}
              onPress={this.addPerson.bind(this)}
              text="Submit"
            />

            {this.state.loading && (
              <View>
                <ActivityIndicator size="large" color={color.primary} />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default AddPersonScreen;
