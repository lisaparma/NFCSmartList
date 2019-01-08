import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer, NavigationActions
} from "react-navigation";

import TopBar from "../components/TopBar";
import LCatalogList from "./LikeStack/LCatalogList";
import FCatalog from "./FriendStack/FCatalog";
import FDetailsCatalog from "./FriendStack/FDetailsCatalog";
import LCatalog from "./LikeStack/LCatalog";

const LikesStack = createAppContainer(createStackNavigator(
  {
    LCatalogList: {
      screen: () => <LCatalogList />,
      navigationOptions: () => ({
        header: (props: any) =>
          <TopBar
            title="Catalogs"
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
  },
  {
    initialRouteName: 'LCatalogList',
  }
));

export default class LikeStack extends Component {

  static router = LikesStack.router;

  public render() {
    return (
      <LikesStack navigation={this.props.navigation}/>
    )
  }
}

