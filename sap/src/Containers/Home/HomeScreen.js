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

import BackgroundTimer from 'react-native-background-timer';
import { testBackground } from '../../Services/API/notif';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: true,
    };
  }

  async componentDidMount() {

    // BackgroundTimer.runBackgroundTimer(async () => {
    //   //code that will be called every 3 seconds 
    //   testBackground();
    // },
    //   1000);

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
      <View style={this.state.darkMode ? styles.darkHomeContainer : styles.lightHomeContainer}>

        <Header
          route={{ name: 'Goals' }}
          style={this.state.darkMode ? styles.darkHeader : styles.lightHeader}
          rightIcon="profile"
          onRightPress={() => this.props.navigation.navigate('Profile')}
        />
      </View>
    )

    return (
      <View style={styles.home}>
        <Header
          route={{ name: 'home' }}
          style={styles.header}
          rightIcon="profile"
          onRightPress={() => this.props.navigation.navigate('Profile')}
        />
        <ScrollView style={styles.container}>

          {/* <TouchableOpacity
            style={{ marginVertical: size.scale(20), alignItems: 'center', marginBottom: size.scale(60) }}
            onPress={() => this.props.navigation.navigate('TrackLocation')}
          >
            <Text style={{ fontSize: 24, color: 'white' }}>Track Location</Text>
          </TouchableOpacity> */}

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
