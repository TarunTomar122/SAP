import React from 'react';
import AppNavigator from '../../Navigators/AppNavigator';

import Notifications from "../../Services/Notifications";
import { setNotifToken } from '../../Services/API/user';

class RootScreen extends React.Component {
  constructor(props) {
    super(props);
    Notifications.init(this.handleRegister, this.onNotification.bind(this));
    this.state = {
      notificationToken: null,
    }
  }


  onNotification(notification) {
    console.log("Notification: ", notification);
  }

  handleRegister = async (token) => {
    console.log("Token: ", token);
    this.setState({ notificationToken: token });
    try {
      const response = await setNotifToken({ userType: "dev", notificationToken: token });
      console.log("Response: ", response);
    } catch (e) {
      console.error(e);
    }
  }

  async componentDidMount() { }

  componentWillUnmount() {
    Notifications.delete();
  }

  render() {
    return <AppNavigator />;
  }
}

export default RootScreen;
