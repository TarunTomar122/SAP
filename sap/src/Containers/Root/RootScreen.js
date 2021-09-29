import React from 'react';
import AppNavigator from '../../Navigators/AppNavigator';

class RootScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <AppNavigator />;
  }
}

export default RootScreen;
