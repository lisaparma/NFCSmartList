import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";


import TopBar from "../components/TopBar";
import Friends from "./FriendStack/Friends";

const FriendsStack = createAppContainer(createStackNavigator(
  {
    Friends: {
      screen: () => <Friends/>,
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

