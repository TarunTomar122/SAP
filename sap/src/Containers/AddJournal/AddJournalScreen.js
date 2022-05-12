import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';

import styles from './styles';
import { color, size, typography } from '../../theme';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { addJournalEntry } from '../../Services/API/journal';

class AddJournalScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            darkMode: true,
            pageNo: 1,
            firstText: '',
            secondText: '',
            thirdText: '',
            fourthText: '',
            rating: '',
        };
    }

    async componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.refreshScreen();
        });
    }

    componentWillUnmount() {
        try {
            this._unsubscribe();
        } catch (err) { }
    }

    async refreshScreen() { }

    async addJournal() {
        const { firstText, secondText, thirdText, fourthText, rating } = this.state;
        const data = [firstText, secondText, thirdText, fourthText, rating];
        const response = await addJournalEntry(data);
        if (response) {
            this.props.navigation.navigate('people');
            ToastAndroid.show('Added', ToastAndroid.SHORT);
        }
        else {
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        }
    }

    render() {
        return (
            <View style={this.state.darkMode ? styles.darkHome : styles.lightHome}>

                {this.state.pageNo === 1 && (
                    <ScrollView style={this.state.darkMode ? styles.darkQuestionContainer : styles.lightQuestionContainer} showsVerticalScrollIndicator={false}>
                        <Text style={this.state.darkMode ? styles.darkQuestion : styles.lightQuestion}>
                            What's happening right now?
                        </Text>
                        <TextInput
                            style={this.state.darkMode ? styles.darkInput : styles.lightInput}
                            placeholder="Type your thoughts here"
                            placeholderTextColor={color.darkGrey}
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(text) => {
                                this.setState({ firstText: text });
                            }}
                            value={this.state.firstText}
                        />
                        <TouchableOpacity
                            style={this.state.darkMode ? styles.darkNextButton : styles.lightNextButton}
                            onPress={() => {
                                this.setState({ pageNo: 2 });
                            }}
                        >
                            <Text style={this.state.darkMode ? styles.darkNextButtonText : styles.lightNextButtonText}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                )}

                {this.state.pageNo === 2 && (
                    <ScrollView style={this.state.darkMode ? styles.darkQuestionContainer : styles.lightQuestionContainer} showsVerticalScrollIndicator={false}>
                        <Text style={this.state.darkMode ? styles.darkQuestion : styles.lightQuestion}>
                            What do you wanna change right now?
                        </Text>
                        <TextInput
                            style={this.state.darkMode ? styles.darkInput : styles.lightInput}
                            placeholder="Type your thoughts here"
                            placeholderTextColor={color.darkGrey}
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(text) => {
                                this.setState({ secondText: text });
                            }}
                            value={this.state.secondText}
                        />
                        <View style={this.state.darkMode ? styles.darkButtonContainer : styles.lightButtonContainer}>
                            <TouchableOpacity
                                style={this.state.darkMode ? styles.darkNextButton : styles.lightNextButton}
                                onPress={() => {
                                    this.setState({ pageNo: 1 });
                                }}
                            >
                                <Text style={this.state.darkMode ? styles.darkNextButtonText : styles.lightNextButtonText}>
                                    Previous
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.darkMode ? styles.darkNextButton : styles.lightNextButton}
                                onPress={() => {
                                    this.setState({ pageNo: 3 });
                                }}
                            >
                                <Text style={this.state.darkMode ? styles.darkNextButtonText : styles.lightNextButtonText}>
                                    Next
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}


                {this.state.pageNo === 3 && (
                    <ScrollView style={this.state.darkMode ? styles.darkQuestionContainer : styles.lightQuestionContainer} showsVerticalScrollIndicator={false}>
                        <Text style={this.state.darkMode ? styles.darkQuestion : styles.lightQuestion}>
                            What are you most worried about right now?
                        </Text>
                        <TextInput
                            style={this.state.darkMode ? styles.darkInput : styles.lightInput}
                            placeholder="Type your concerns here"
                            placeholderTextColor={color.darkGrey}
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(text) => {
                                this.setState({ thirdText: text });
                            }}
                            value={this.state.thirdText}
                        />
                        <View style={this.state.darkMode ? styles.darkButtonContainer : styles.lightButtonContainer}>
                            <TouchableOpacity
                                style={this.state.darkMode ? styles.darkNextButton : styles.lightNextButton}
                                onPress={() => {
                                    this.setState({ pageNo: 2 });
                                }}
                            >
                                <Text style={this.state.darkMode ? styles.darkNextButtonText : styles.lightNextButtonText}>
                                    Previous
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.darkMode ? styles.darkNextButton : styles.lightNextButton}
                                onPress={() => {
                                    this.setState({ pageNo: 4 });
                                }}
                            >
                                <Text style={this.state.darkMode ? styles.darkNextButtonText : styles.lightNextButtonText}>
                                    Next
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}

                {this.state.pageNo === 4 && (
                    <ScrollView style={this.state.darkMode ? styles.darkQuestionContainer : styles.lightQuestionContainer} showsVerticalScrollIndicator={false}>
                        <Text style={this.state.darkMode ? styles.darkQuestion : styles.lightQuestion}>
                            What are you most grateful about right now?
                        </Text>
                        <TextInput
                            style={this.state.darkMode ? styles.darkInput : styles.lightInput}
                            placeholder="Type your thoughts here"
                            placeholderTextColor={color.darkGrey}
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(text) => {
                                this.setState({ fourthText: text });
                            }}
                            value={this.state.fourthText}
                        />
                        <View style={this.state.darkMode ? styles.darkButtonContainer : styles.lightButtonContainer}>
                            <TouchableOpacity
                                style={this.state.darkMode ? styles.darkNextButton : styles.lightNextButton}
                                onPress={() => {
                                    this.setState({ pageNo: 3 });
                                }}
                            >
                                <Text style={this.state.darkMode ? styles.darkNextButtonText : styles.lightNextButtonText}>
                                    Previous
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.darkMode ? styles.darkNextButton : styles.lightNextButton}
                                onPress={() => {
                                    this.setState({ pageNo: 5 });
                                }}
                            >
                                <Text style={this.state.darkMode ? styles.darkNextButtonText : styles.lightNextButtonText}>
                                    Next
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}

                {this.state.pageNo === 5 && (
                    <ScrollView style={this.state.darkMode ? styles.darkQuestionContainer : styles.lightQuestionContainer} showsVerticalScrollIndicator={false}>
                        <Text style={this.state.darkMode ? styles.darkQuestion : styles.lightQuestion}>
                            Tell us how you feel using one of the emojies.
                        </Text>

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

                        <View style={this.state.darkMode ? styles.darkButtonContainer : styles.lightButtonContainer}>
                            <TouchableOpacity
                                style={this.state.darkMode ? styles.darkNextButton : styles.lightNextButton}
                                onPress={() => {
                                    this.setState({ pageNo: 4 });
                                }}
                            >
                                <Text style={this.state.darkMode ? styles.darkNextButtonText : styles.lightNextButtonText}>
                                    Previous
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.darkMode ? styles.darkNextButton : styles.lightNextButton}
                                onPress={this.addJournal.bind(this)}
                            >
                                <Text style={this.state.darkMode ? styles.darkNextButtonText : styles.lightNextButtonText}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}

            </View>
        );
    }
}

export default AddJournalScreen;
