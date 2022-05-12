import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from '../Components/TabBar';
import Header from '../Components/Header';

import HomeScreen from '../Containers/Home/HomeScreen.js';
import AnalysisScreen from '../Containers/Analysis/AnalysisScreen.js';
import TodoScreen from '../Containers/Todo/TodoScreen.js';
import TrackScreen from '../Containers/Track/TrackScreen.js';
import ReadScreen from '../Containers/Read/ReadScreen.js';

import AddTaskScreen from '../Containers/AddTask/AddTaskScreen.js';
import TaskDetailsScreen from '../Containers/TaskDetails/TaskDetailsScreen.js';

import PeopleScreen from '../Containers/People/PeopleScreen.js';
import AddPersonScreen from '../Containers/AddPerson/AddPersonScreen.js';
import AddThoughtScreen from '../Containers/AddThought/AddThoughtScreen';
import ViewJournalScreen from '../Containers/ViewJournal/ViewJournalScreen.js';
import AddJournalScreen from '../Containers/AddJournal/AddJournalScreen';

import AnalysisDetailsScreen from '../Containers/AnalysisDetails/AnalysisDetailsScreen.js';

import ArticleDetailsScreen from '../Containers/ArticleDetails/ArticleDetailsScreen.js';

import ReminderScreen from '../Containers/Reminder/ReminderScreen.js';
import AddReminderScreen from '../Containers/AddReminder/AddReminderScreen.js';

import ProfileScreen from '../Containers/Profile/ProfileScreen.js';
import StateScreen from '../Containers/State/StateScreen.js';
import AutomateScreen from '../Containers/Automate/AutomateScreen.js';
import FolderDetailScreen from '../Containers/FolderDetail/FolderDetailScreen.js';
import FileContentScreen from '../Containers/FileContent/FileContentScreen.js';

import TrackLocationScreen from '../Containers/TrackLocation/TrackLocationScreen.js';

import GoalDetailScreen from '../Containers/GoalDetail/GoalDetailScreen.js';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName={'people'}
      screenOptions={{
        header: props => <Header {...props} />,
        keyboardHidesTabBar: true,
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="todo" component={TodoScreen} options={{ headerShown: false }} />
      <Tab.Screen name="read" component={ReadScreen} options={{ headerShown: false }} />
      <Tab.Screen name="track" component={TrackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="people" component={PeopleScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'HomeTabs'}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="AddPerson" component={AddPersonScreen} />
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
        <Stack.Screen name="AddThought" component={AddThoughtScreen} />
        <Stack.Screen name="ViewJournal" component={ViewJournalScreen} />
        <Stack.Screen name="AddJournal" component={AddJournalScreen} />
        <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} />
        <Stack.Screen name="Analysis" component={AnalysisScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="analysisDetails"
          component={AnalysisDetailsScreen}
        />
        <Stack.Screen name="AddReminder" component={AddReminderScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Reminder" component={ReminderScreen} />
        <Stack.Screen name="State" component={StateScreen} />
        <Stack.Screen name="Automate" component={AutomateScreen} />
        <Stack.Screen name="FolderDetail" component={FolderDetailScreen} />
        <Stack.Screen name="FileContent" component={FileContentScreen} />
        <Stack.Screen name="TrackLocation" component={TrackLocationScreen} />
        <Stack.Screen name="GoalDetail" component={GoalDetailScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
