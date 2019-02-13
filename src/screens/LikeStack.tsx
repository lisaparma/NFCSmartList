import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer, NavigationActions, NavigationScreenProp, NavigationStateRoute, NavigationParams
} from "react-navigation";

import TopBar from "../components/TopBar";
import LCatalogList from "./LikeStack/LCatalogList";
import FCatalog from "./FriendStack/FCatalog";
import FDetailsCatalog from "./FriendStack/FDetailsCatalog";
import LCatalog from "./LikeStack/LCatalog";
import LDetailsCatalog from "./LikeStack/LDetailsCatalog";

const LikesStack = createAppContainer(createStackNavigator(
  {
    LCatalogList: {
      screen: () => <LCatalogList />,
      navigationOptions: () => ({
        header: (props: any) =>
          <TopBar
            title="Likes"
            iconLeft={"menu"}
            onPressLeft={() => props.navigation.toggleDrawer()} // TODO: only if android
          />,
      }),
    },
    LCatalog: {
      screen: () => <LCatalog/>,
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
    LDetailsCatalog: {
      screen: () => <LDetailsCatalog/>,
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
    initialRouteName: 'LCatalogList',
  }
));

interface LikeStackProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

export default class LikeStack extends Component<LikeStackProps> {

  static router = LikesStack.router;

  public render() {
    return (
      <LikesStack navigation={this.props.navigation}/>
    )
  }
}

