import React from 'react';
import { View, Text, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native';

import styles from './styles';
import { color, size, typography } from '../../theme';

import Header from '../../Components/Header';

import { getFileContent } from '../../Services/API/automate';

class FileContentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prefix: this.props.route.params.prefix,
            loading: true,
            content: '',
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
        this.setState({ loading: true });
        const response = await getFileContent(this.state.prefix);
        if (response) {
            this.setState({ loading: false, content: response.content });
        } else {
            ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
        }
    }

    render() {
        return (
            <View style={styles.home}>
                <Header
                    route={{ name: this.state.prefix.slice(0, 12) + '...' }}
                    style={styles.header}
                    leftIcon={true}
                    onLeftPress={() => this.props.navigation.goBack()}
                />
                <ScrollView style={styles.container}>
                    {this.state.loading && (
                        <ActivityIndicator size="large" color={color.primary} />
                    )}
                    <Text style={styles.text}>{this.state.content}</Text>
                </ScrollView>
            </View>
        );
    }
}

export default FileContentScreen;
