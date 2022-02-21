import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import styles from './HomeScreenStyles';
import { color, size, typography } from '../../theme';

import Header from '../../Components/Header';

import * as Progress from 'react-native-progress';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0.75,
      videoProgress: 0.24,
      audioProgress: 0.35,
      textProgress: 0.21,
      physicalProgress: 0.75,
      mentalProgress: 0.65,
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
          route={{ name: 'home' }}
          style={styles.header}
          rightIcon="profile"
          onRightPress={() => this.props.navigation.navigate('Profile')}
        />
        <ScrollView style={styles.container}>

          <TouchableOpacity
            style={styles.progressContainer}
            onPress={() => this.props.navigation.navigate('TrackLocation')}
          >
            <Text style={{ fontSize: 24, color: 'white' }}>Track Location</Text>
          </TouchableOpacity>

          <View style={styles.mainProgressContainer}>
            <Progress.Circle
              progress={this.state.progress}
              size={size.scale(200)}
              thickness={size.scale(8)}
              strokeCap="round"
              showsText={true}
              formatText={(progress) => this.state.progress.toFixed(2) * 100}
              color={color.primary}
              indeterminate={false}
            />
          </View>

          <View style={styles.secondaryProgressContainer}>
            <View style={styles.indvProgressContainer}>
              <Text style={styles.progressHeading}>
                Video Content
              </Text>
              <Progress.Bar
                progress={this.state.videoProgress}
                height={size.scale(12)}
                width={size.scale(300)}
                borderWidth={size.scale(2)}
                borderColor={color.primary}
                color={color.primary}
              />
            </View>

            <View style={styles.indvProgressContainer}>
              <Text style={styles.progressHeading}>
                Audio Content
              </Text>
              <Progress.Bar
                progress={this.state.audioProgress}
                height={size.scale(12)}
                width={size.scale(300)}
                borderWidth={size.scale(2)}
                borderColor={color.primary}
                color={color.primary}
              />
            </View>

            <View style={styles.indvProgressContainer}>
              <Text style={styles.progressHeading}>
                Text Content
              </Text>
              <Progress.Bar
                progress={this.state.textProgress}
                height={size.scale(12)}
                width={size.scale(300)}
                borderWidth={size.scale(2)}
                borderColor={color.primary}
                color={color.primary}
              />
            </View>


            <View style={styles.indvProgressContainer}>
              <Text style={styles.progressHeading}>
                Physical State
              </Text>
              <Progress.Bar
                progress={this.state.physicalProgress}
                height={size.scale(12)}
                width={size.scale(300)}
                borderWidth={size.scale(2)}
                borderColor={color.primary}
                color={color.primary}
              />
            </View>


            <View style={styles.indvProgressContainer}>
              <Text style={styles.progressHeading}>
                Mental State
              </Text>
              <Progress.Bar
                progress={this.state.mentalProgress}
                height={size.scale(12)}
                width={size.scale(300)}
                borderWidth={size.scale(2)}
                borderColor={color.primary}
                color={color.primary}
              />
            </View>

          </View>

        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;
