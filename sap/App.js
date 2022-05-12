import React from 'react';

import RootScreen from './src/Containers/Root/RootScreen';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootScreen />
    </GestureHandlerRootView>
  );
};

export default App;
