import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer, NavigationActions
} from "react-navigation";


import TopBar from "../components/TopBar";
import Friends from "./FriendStack/Friends";
import AddFriend from "./FriendStack/AddFriend";
import CatalogList from "./CatalogStack/CatalogList";
import FCatalogList from "./FriendStack/FCatalogList";

import FCatalog from "./FriendStack/FCatalog";

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
    FCatalogList: {
      screen: () => <FCatalogList />,
      navigationOptions: () => ({
        header: (props: any) =>
          <TopBar
            title="*Catalogs"
            iconLeft={"chevron-left"}
            onPressLeft={() => {props.navigation.dispatch(NavigationActions.back())}}
            // iconRight={"add"}
            // onPressRight={() => {props.navigation.navigate("AddCatalog")}}
          />,
      }),
    },
    FCatalog: {
      screen: () => <FCatalog/>,
      navigationOptions: (props: any) => ({
        header: () =>
          <TopBar
            title={"*" + props.navigation.getParam("name")}
            iconLeft={"chevron-left"}
            onPressLeft={() => {props.navigation.dispatch(NavigationActions.back())}}
            iconRight={"more-horiz"}
            onPressRight={() => {props.navigation.setParams({menu: !props.navigation.getParam("menu")})}}
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

