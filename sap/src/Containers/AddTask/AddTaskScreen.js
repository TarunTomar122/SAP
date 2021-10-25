import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

import Header from '../../Components/Header';
import Autocomplete from 'react-native-autocomplete-input';

import styles from './AddTaskScreenStyles';
import {color, size, typography} from '../../theme';

class AddTaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: null,
      goal: null,
      modalVisible: true,
      data: ['pushups', 'situps', 'sex'],
    };
  }

  componentDidMount() {}

  filterData(taskName) {
    return this.state.data.filter(item => item.includes(taskName));
  }

  render() {
    const {taskName} = this.state;
    const data = this.filterData(taskName);

    return (
      <View style={styles.home}>
        <Header
          route={{name: 'add task'}}
          leftIcon={true}
          onLeftPress={() => this.props.navigation.navigate('track')}
        />

        <View style={styles.container}>
          <View style={styles.autocompleteContainer}>
            <Autocomplete
              data={data}
              value={taskName}
              onChangeText={text =>
                this.setState({taskName: text, modalVisible: true})
              }
              placeholder="Task name"
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
                        this.setState({taskName: item});
                        this.setState({modalVisible: false});
                      }}>
                      <Text style={styles.suggestionText}>{item}</Text>
                    </TouchableOpacity>
                  );
                },
              }}
            />

            <TextInput
              style={[styles.textInput]}
              placeholder="Today's Goal"
              placeholderTextColor="#999999"
              color="#999999"
              onChangeText={text => {
                this.setState({goal: text});
              }}
              value={this.state.goal}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log(this.state)}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default AddTaskScreen;
