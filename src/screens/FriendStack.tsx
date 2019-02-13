import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer, NavigationActions, NavigationScreenProp, NavigationStateRoute, NavigationParams
} from "react-navigation";


import TopBar from "../components/TopBar";
import Friends from "./FriendStack/Friends";
import AddFriend from "./FriendStack/AddFriend";
import FCatalogList from "./FriendStack/FCatalogList";

import FCatalog from "./FriendStack/FCatalog";
import FDetailsCatalog from "./FriendStack/FDetailsCatalog";

const FriendsStack = createAppContainer(createStackNavigator(
  {
    Friends: {
      screen: () => <Friends/>,
      navigationOptions: () => ({
        header: (props) =>
          <TopBar
            title="Friends"
            iconLeft={"menu"}
            onPressLeft={() => props.navigation.toggleDrawer()} // TODO: only if android
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
            title="Add friend"
            iconLeft={"chevron-left"}
            onPressLeft={() => {props.navigation.dispatch(NavigationActions.back())}}
          />,
      }),
    },
    FCatalogList: {
      screen: () => <FCatalogList />,
      navigationOptions: (props: any) => ({
        header: () =>
          <TopBar
            title={props.navigation.getParam("username")}
            iconLeft={"chevron-left"}
            onPressLeft={() => {props.navigation.dispatch(NavigationActions.back())}}
          />,
      }),
    },
    FCatalog: {
      screen: () => <FCatalog/>,
      navigationOptions: (props: any) => ({
        header: () =>
          <TopBar
            title={props.navigation.getParam("name")}
            iconLeft={"chevron-left"}
            onPressLeft={() => {props.navigation.dispatch(NavigationActions.back())}}
            iconRight={"more-horiz"}
            onPressRight={() => {props.navigation.setParams({menu: !props.navigation.getParam("menu")})}}
          />,
      }),
    },
    FDetailsCatalog: {
      screen: () => <FDetailsCatalog/>,
      navigationOptions: () => ({
        header: (props: any) =>
          <TopBar
            title="Details catalog"
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

interface FriendStackProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}
export default class FriendStack extends Component<FriendStackProps> {

  static router = FriendsStack.router;

  public render() {
    return (
      <FriendsStack navigation={this.props.navigation}/>
    )
  }
}

