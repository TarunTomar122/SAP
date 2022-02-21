import React from 'react';
import { View, Text, ActivityIndicator, ToastAndroid, TouchableOpacity, ScrollView } from 'react-native';

import styles from './styles';
import { color, size, typography } from '../../theme';

import Header from '../../Components/Header';

import { getFolder, startSetup } from '../../Services/API/automate';

import AntDesign from 'react-native-vector-icons/AntDesign';

class FolderDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folderName: this.props.route.params.folderName,
            loading: true,
            folders: [],
            files: [],
            prefix: '',
        };
    }

    async componentDidMount() {
        this.refreshScreen(this.state.folderName);
    }

    async refreshScreen(folder) {
        this.setState({ loading: true });
        let prefix = this.state.prefix;
        prefix = prefix.concat('/', folder);
        const response = await getFolder(prefix);
        if (response) {
            this.setState({ folders: response.content.folders, files: response.content.files });
            this.setState({ prefix });
        } else {
            ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
        }
        this.setState({ loading: false });
    }

    async getReady() {
        const response = await startSetup(this.state.prefix);
        if (response) {
            ToastAndroid.show('Setup Started', ToastAndroid.SHORT);
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
                    rightIcon="run"
                    onRightPress={this.getReady.bind(this)}
                />
                <ScrollView style={styles.container}>
                    {this.state.loading && (
                        <ActivityIndicator size="large" color={color.primary} />
                    )}
                    {
                        !this.state.loading && this.state.folders.map((folder, index) => (
                            <TouchableOpacity key={index} style={styles.cardStyle} onPress={() => {
                                this.refreshScreen(folder);
                            }}>
                                <AntDesign
                                    name="folderopen"
                                    size={size.scale(24)}
                                    color={color.primary}
                                    style={{ marginRight: size.scale(20) }}
                                />
                                <Text style={styles.text}>{folder}</Text>
                            </TouchableOpacity>
                        ))
                    }
                    {
                        !this.state.loading && this.state.files.map((file, index) => (
                            <TouchableOpacity key={index} style={styles.cardStyle} onPress={() => {
                                this.props.navigation.navigate("FileContent", { prefix: this.state.prefix + '/' + file });
                            }}>
                                <AntDesign
                                    name="file1"
                                    size={size.scale(24)}
                                    color={color.primary}
                                    style={{ marginRight: size.scale(20) }}
                                />
                                <Text style={styles.text}>{file}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        );
    }
}

export default FolderDetailScreen;
