import React from 'react';
import { View, Text, ToastAndroid, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import styles from './AddReminderScreenStyles';
import { color, colorLight, size, typography } from '../../theme';

import Button from '../../Components/Button';
import Header from '../../Components/Header';
import HorizontalTimePiker from "../../Components/HorizontalTimePiker";

import { setReminder, getReminder, deleteReminder } from '../../Services/API/notif';

class AddReminderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.route.params.title,
            description: this.props.route.params.description,
            lastDate: null,
            loading: false,
            open: false,
            value: 'None',
            items: [
                { label: 'None', value: 'None' },
                { label: '15 mins', value: '15 mins' },
                { label: '30 mins', value: '30 mins' },
                { label: '1 hr', value: '1 hr' },
                { label: '3 hrs', value: '3 hrs' },
                { label: '6 hrs', value: '6 hrs' },
                { label: '12 hrs', value: '12 hrs' },
            ],
            exactValue: "None  ",
            reminderExists: false,
            darkMode: true,
        };
    }

    async componentDidMount() {
        this.setState({ loading: true });
        const response = await getReminder(this.state.title);
        if (response) {
            const obj = response.data;
            if (obj) {
                this.setState({ loading: false, reminderExists: true, exactValue: obj.exactTime, value: obj.timeInterval });
            }
        }
        this.setState({ loading: false });

    }

    async submit() {

        if (this.state.exactValue == "None  " && this.state.value == "None") {
            ToastAndroid.show('Please select a time', ToastAndroid.SHORT);
            return;
        }

        const obj = {
            "isExact": this.state.value == "None" ? true : false,
            "exactTime": this.state.exactValue,
            "timeInterval": this.state.value,
            "title": this.state.title,
            "description": this.state.description,
            "permanent": this.props.route.params.permanent,
        }

        this.setState({ loading: true });

        const flag = await setReminder(obj);

        if (!flag) {
            this.setState({ loading: false });
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        }

        this.props.navigation.goBack();

    }

    async handleDelete() {
        await deleteReminder(this.state.title);
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={this.state.darkMode ? styles.darkHomeContainer : styles.lightHomeContainer}>
                <Header
                    route={{ name: 'Add reminder' }}
                    style={this.state.darkMode ? styles.darkHeader : styles.lightHeader}
                    rightIcon={this.state.reminderExists ? "delete" : null}
                    onRightPress={this.handleDelete.bind(this)}
                />
                <ScrollView style={styles.container}>
                    <Text style={this.state.darkMode ? styles.darkPickText : styles.lightPickText}>Notify Every</Text>
                    <DropDownPicker
                        open={this.state.open}
                        value={this.state.value}
                        items={this.state.items}
                        setOpen={open => this.setState({ open: open })}
                        setValue={value => {
                            this.setState({ value: value(), exactValue: "None  " });
                        }}
                        setItems={items => {
                            this.setState({ items: items() });
                        }}
                        style={[styles.pickerContainer, styles.elevation]}
                        textStyle={this.state.darkMode ? styles.darkPickText : styles.lightPickText}
                        dropDownContainerStyle={[styles.pickerDropDown, styles.elevation]}
                        listMode="SCROLLVIEW"
                        listItemContainerStyle={{
                            height: size.scale(50),
                        }}
                        dropDownDirection="BOTTOM"
                        itemSeparator={true}
                        itemSeparatorStyle={[
                            {
                                backgroundColor: '#999999',
                                opacity: 0.4,
                            },
                            styles.elevation,
                        ]}
                        labelStyle={{ borderRadius: 5, borderColor: 'white' }}
                    />
                    <Text style={this.state.darkMode ? styles.darkPickText : styles.lightPickText}>Notify At</Text>

                    <View style={styles.dateContainer}>
                        <HorizontalTimePiker
                            selectedIndex={15}
                            height={75}
                            timeInterval={30}
                            marginHorizontal={0}
                            enabled={true}
                            onChange={(val) => {
                                this.setState({ exactValue: val, value: 'None' });
                            }}
                            visibleElements={4}
                            mainColor={color.primary}
                            secondaryColor={color.darkGrey}
                            fontSize={size.scale(22)}
                            fontFamily={typography.primaryBold}
                            backgroundColor={this.state.darkMode ? color.background : colorLight.background}
                        ></HorizontalTimePiker>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button text="submit"
                            style={this.state.darkMode ? styles.darkButton : styles.lightButton}
                            textStyle={this.state.darkMode ? styles.darkButtonText : styles.lightButtonText}
                            onPress={this.submit.bind(this)}
                        />
                    </View>

                    {this.state.loading && (
                        <ActivityIndicator size="large" color={color.primary} />
                    )}

                </ScrollView>

            </View>
        );
    }
}


export default AddReminderScreen;

