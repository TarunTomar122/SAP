import React from 'react';
import {
    View,
    Text,
    ToastAndroid,
    Modal,
    Pressable,
    ActivityIndicator,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import styles from './ReminderScreenStyles';
import { color, size, typography } from '../../theme';

import Header from '../../Components/Header';

import { getAllReminders, deleteReminder } from '../../Services/API/notif';

import AntDesign from 'react-native-vector-icons/AntDesign';

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            reminders: [],
            modalVisible: false,
            title: '',
            description: '',
        };
    }

    async componentDidMount() {

        this.refreshScreen();
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
        this.setState({ loading: true });
        const response = await getAllReminders();

        if (response) {
            const obj = response.data;

            const reminders = [];

            const tNotifications = obj.notifications;
            const tReminders = obj.reminders;

            for (let i = 0; i < tNotifications.length; i++) {
                const notification = tNotifications[i];
                const reminder = {
                    title: notification.title,
                    description: notification.description,
                    type: 'notification',
                    exactTime: notification.exactTime,
                };
                reminders.push(reminder);
            }

            for (let i = 0; i < tReminders.length; i++) {
                const reminderr = tReminders[i];
                const reminder = {
                    title: reminderr.title,
                    description: reminderr.description,
                    type: 'reminder',
                    timeInterval: reminderr.timeInterval,
                };
                reminders.push(reminder);
            }

            this.setState({ reminders });

        } else {
            ToastAndroid.show('Error', ToastAndroid.SHORT);
        }
        this.setState({ loading: false });
    }

    async handleSubmit() {

        const { title, description } = this.state;

        if (title.length === 0) {
            ToastAndroid.show('Title is required', ToastAndroid.SHORT);
            return;
        }

        this.setState({ modalVisible: false, title: '', description: '' });
        this.props.navigation.navigate('AddReminder', { title, description, permanent: true })

    }

    render() {
        return (
            <View style={styles.home}>
                <Header
                    route={{ name: 'reminders' }}
                    style={styles.header}
                    leftIcon="back"
                    onLeftPress={() => this.props.navigation.goBack()}
                    rightIcon="add"
                    onRightPress={() => this.setState({ modalVisible: true })}
                />
                <View style={styles.container}>
                    {this.state.loading && (
                        <ActivityIndicator size="large" color={color.primary} />
                    )}
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
                                <View style={styles.modalView}>
                                    <TextInput
                                        style={[styles.textInput]}
                                        placeholder="Title"
                                        placeholderTextColor="#999999"
                                        color="#999999"
                                        onChangeText={text => {
                                            this.setState({ title: text });
                                        }}
                                        value={this.state.title}
                                    />
                                    <TextInput
                                        style={[styles.textInput]}
                                        placeholder="Description (Optional)"
                                        placeholderTextColor="#999999"
                                        color="#999999"
                                        multiline={true}
                                        textAlignVertical="top"
                                        numberOfLines={1}
                                        onChangeText={text => {
                                            this.setState({ description: text });
                                        }}
                                        value={this.state.description}
                                    />
                                    <Pressable
                                        style={[styles.button]}
                                        onPress={() => this.handleSubmit()}
                                        disabled={this.state.loading}
                                    >
                                        <Text style={styles.textStyle}>Submit</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    {
                        this.state.reminders.length === 0 && !this.state.loading && (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.text}>No reminders yet</Text>
                            </View>
                        )
                    }
                    {this.state.reminders.length != 0 && (
                        this.state.reminders.map((reminder, index) => {
                            return (
                                <View style={styles.reminderCard} key={index}>
                                    <View>
                                        <Text style={styles.reminderTitle}>{reminder.title}</Text>
                                        {reminder.description.length != 0 && (<Text style={styles.reminderDescription}>{reminder.description.slice(0, 28)}...</Text>)}
                                        {reminder.type === 'notification' && (
                                            <Text style={styles.reminderTime}>At {reminder.exactTime}</Text>
                                        )}
                                        {reminder.type === 'reminder' && (
                                            <Text style={styles.reminderTime}>Every {reminder.timeInterval}</Text>
                                        )}
                                    </View>
                                    <TouchableOpacity onPress={async () => {
                                        await deleteReminder(reminder.title);
                                        this.refreshScreen();
                                    }}>
                                        <AntDesign name="delete" style={styles.icon} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    )}

                </View>
            </View>
        );
    }
}

export default ProfileScreen;
