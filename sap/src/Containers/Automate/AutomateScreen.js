import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid, ScrollView } from 'react-native';

import styles from './styles';
import { color, size, typography } from '../../theme';

import Header from '../../Components/Header';

import { getProjects } from '../../Services/API/automate';

import AntDesign from 'react-native-vector-icons/AntDesign';

class AutomateScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            loading: true,
        };
    }

    async componentDidMount() {
        this.refreshScreen();
    }

    async refreshScreen() {
        const response = await getProjects();
        if (response) {
            this.setState({ projects: response.projects });
        } else {
            ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <View style={styles.home}>
                <Header
                    route={{ name: 'projects' }}
                    style={styles.header}
                    leftIcon={true}
                    onLeftPress={() => this.props.navigation.goBack()}
                />
                <ScrollView style={styles.container}>
                    {
                        this.state.loading && (
                            <ActivityIndicator size="large" color={color.primary} />
                        )
                    }
                    {this.state.projects.map((project, index) => (
                        <TouchableOpacity key={index} style={styles.cardStyle} onPress={() => this.props.navigation.navigate("FolderDetail", { folderName: project })}>
                            <AntDesign
                                name="folderopen"
                                size={size.scale(24)}
                                color={color.primary}
                                style={{ marginRight: size.scale(20) }}
                            />
                            <Text style={styles.text}>{project}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

export default AutomateScreen;
