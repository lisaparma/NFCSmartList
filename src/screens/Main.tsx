import React, {Component} from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
} from "react-navigation";
import { Icon } from "react-native-elements";

import Settings from "./Settings";
import CatalogStack from "./CatalogStack"
import FriendStack from "./FriendStack";
import LikeStack from "./LikeStack";

// TODO: if android  createDrawerNavigator
// iconlist only material icons https://oblador.github.io/react-native-vector-icons/

const MainTabs = createBottomTabNavigator(
  {
    'Friends': {
      screen: FriendStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            name='people'
            color={tintColor}
          />
        )
      })
    },
    'Catalogs': {
      screen: CatalogStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            name='assignment'
            color={tintColor}
          />
        )
      })
    },
    'Likes': {
      screen: LikeStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            name='favorite-border'
            color={tintColor}
          />
        )
      })
    },
    'Settings': {
      screen: Settings,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            name='settings'
            color={tintColor}
          />
        )
      })
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
    }),
    initialRouteName: 'Catalogs',
  }
);

const Navigator = createAppContainer(MainTabs);

export default class Main extends Component {

  public render() {
    return (
      <Navigator/>
    );
  }

}

