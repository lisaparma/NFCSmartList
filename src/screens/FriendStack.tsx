import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer, NavigationActions
} from "react-navigation";


import TopBar from "../components/TopBar";
import Friends from "./FriendStack/Friends";
import AddFriend from "./FriendStack/AddFriend";

const FriendsStack = createAppContainer(createStackNavigator(
  {
    Friends: {
      screen: () => <Friends/>,
      navigationOptions: () => ({
        header: (props) =>
          <TopBar
            title="Friends"
            // onPressLeft={() => props.navigation.toggleDrawer()} // TODO: only if android
            iconRight={"add"}
            onPressRight={() => {props.navigation.navigate("AddFriend")}}
          />,
      }),
    },
    AddFriend: {
      screen: () => <AddFriend/>,
      navigationOptions: () => ({
        header: (props: any) =>
          <TopBar
            title="Add catalog"
            iconLeft={"chevron-left"}
            onPressLeft={() => {props.navigation.dispatch(NavigationActions.back())}}
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

