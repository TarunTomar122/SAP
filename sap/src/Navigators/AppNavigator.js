import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabBar from '../Components/TabBar';
import Header from '../Components/Header';

import HomeScreen from '../Containers/Home/HomeScreen.js';
import JournalScreen from '../Containers/Journal/JournalScreen.js';
import PeopleScreen from '../Containers/People/PeopleScreen.js';
import TodoScreen from '../Containers/Todo/TodoScreen.js';
import TrackScreen from '../Containers/Track/TrackScreen.js';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName={'home'}
      screenOptions={{header: props => <Header {...props} />}}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="todo" component={TodoScreen} />
      <Tab.Screen name="journal" component={JournalScreen} />
      <Tab.Screen name="track" component={TrackScreen} />
      <Tab.Screen name="people" component={PeopleScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'HomeTabs'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
