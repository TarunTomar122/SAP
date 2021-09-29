import {createAppContainer} from 'react-navigation';

import HomeScreen from '../Containers/Home/HomeScreen.js';

import {createStackNavigator} from 'react-navigation-stack';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default createAppContainer(HomeStack);
