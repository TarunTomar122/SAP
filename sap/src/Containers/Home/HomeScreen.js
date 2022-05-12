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
      darkMode: true,
      goals: [1, 2, 3, 4, 5, 6],
      goal: {
        title: 'I wanna play more valorant',
        progress: 0.3,
        targets: [
          {
            title: 'spend 2 hours on the app',
            done: true,
          },
          {
            title: 'workout for atleast an hour',
            done: false,
          },
        ]
      }
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
        // rightIcon="profile"
        // onRightPress={() => this.props.navigation.navigate('Profile')}
        />

        {this.state.loading ? (
          <ActivityIndicator size="large" color={color.primary} />
        ) : (
          <ScrollView
            style={styles.listView}
            showsVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={this._onRefresh}
          //   />
          // }
          >

            {this.state.goals == 0 && (
              <>
                <Text style={styles.noEntryText}>no entries for today 😏</Text>
              </>
            )}

            {

              this.state.goals.map((goal, index) => {
                return (
                  <TouchableOpacity
                    style={[this.state.darkMode ? styles.darkGoalContainer : styles.lightGoalContainer, styles.elevation]}
                    key={index}
                    onPress={() => this.props.navigation.navigate('GoalDetail', { goal: this.state.goal })}
                  >

                    <Text style={this.state.darkMode ? styles.darkGoalTitle : styles.lightGoalTitle}>
                      I wanna play more valorant uwu here and there
                    </Text>

                    <Progress.Bar
                      progress={0.3}
                      height={size.scale(10)}
                      width={null}
                      borderWidth={size.scale(2)}
                      borderColor={color.primary}
                      color={color.primary}
                    />

                  </TouchableOpacity>
                )
              })

            }
          </ScrollView>
        )
        }
      </View>
    )

  }
}

export default HomeScreen;
