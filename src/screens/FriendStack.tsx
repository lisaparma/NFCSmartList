import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import {View} from "react-native";

const FriendsStack = createAppContainer(createStackNavigator(
  {
    Friends: {
      screen: () => <View/>,
      navigationOptions: () => ({
        header: <View/>,
      }),
    },
  },
  {
    initialRouteName: 'Friends',
  }
));

export default class FriendStack extends Component {

  static router = FriendsStack.router;

  public render() {
    return (
      <FriendsStack navigation={this.props.navigation}/>
    )
  }
}

