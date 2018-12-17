import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import {View} from "react-native";
import TopBar from "../components/TopBar";

const FriendsStack = createAppContainer(createStackNavigator(
  {
    Friends: {
      screen: () => <View/>,
      navigationOptions: () => ({
        header: (props) =>
          <TopBar
            title="Friends"
            // onPressLeft={() => props.navigation.toggleDrawer()} // TODO: only if android
            onPressRight={() => {}}
          />,
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

