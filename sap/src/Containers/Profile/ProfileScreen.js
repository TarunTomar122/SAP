import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from './ProfileScreenStyles';
import { color, size, typography } from '../../theme';

import Header from '../../Components/Header';

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    async refreshScreen() {

    }


    render() {
        return (
            <View style={styles.home}>
                <Header
                    route={{ name: 'profile' }}
                    style={styles.header}
                    leftIcon="back"
                    onLeftPress={() => this.props.navigation.goBack()}
                />
                <View style={styles.container}>

                    <TouchableOpacity style={styles.cardStyle} onPress={() => this.props.navigation.navigate('Reminder')}>
                        <Text style={styles.text}>manage reminders</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

export default ProfileScreen;
