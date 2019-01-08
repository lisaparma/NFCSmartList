import React, {Component} from 'react';
import {
  createBottomTabNavigator,
  createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator,
} from "react-navigation";
import { Icon } from "react-native-elements";

import SettingsStack from "./SettingsStack";
import CatalogStack from "./CatalogStack"
import FriendStack from "./FriendStack";
import LikeStack from "./LikeStack";
import {store} from "../App";
import {Platform} from "react-native";

// iconlist only material icons https://oblador.github.io/react-native-vector-icons/

const MainTabsIOS = createBottomTabNavigator(
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
      screen: SettingsStack,
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

const MainTabsAndroid = createMaterialTopTabNavigator(
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
    // 'Likes': {
    //   screen: LikeStack,
    //   navigationOptions: () => ({
    //     tabBarIcon: ({tintColor}: any) => (
    //       <Icon
    //         name='favorite-border'
    //         color={tintColor}
    //       />
    //     )
    //   })
    // },
    'Settings': {
      screen: SettingsStack,
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
const NavigatorIOS = createAppContainer(MainTabsIOS);
const NavigatorAndroid = createAppContainer(MainTabsAndroid);

export default class Main extends Component {

  public render() {
    if(Platform.OS === "ios") {
      return (
        <NavigatorIOS/>
      );
    } else {
      return(
        <NavigatorAndroid/>
      );
    }
  }

}

