import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import Header from '../../Components/Header';
import Autocomplete from 'react-native-autocomplete-input';

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
      contacts: '',
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

  async addPerson() {}

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
          route={{name: 'Add Person'}}
          leftIcon={true}
          onLeftPress={() => this.props.navigation.navigate('track')}
        />

        <View style={styles.container}>
          <View style={styles.autocompleteContainer}>
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

            <Autocomplete
              data={filteredData}
              value={tagName == null ? null : tagName.toLowerCase()}
              onChangeText={text =>
                this.setState({
                  tagName: text.toLocaleLowerCase(),
                  modalVisible: true,
                })
              }
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
                        this.setState({tagName: item.name});
                        this.setState({modalVisible: false});
                      }}>
                      <Text style={styles.suggestionText}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                },
              }}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.addPerson.bind(this)}>
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
      </View>
    );
  }
}

export default AddPersonScreen;
