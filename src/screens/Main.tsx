import React, {Component} from 'react';
import {
  createBottomTabNavigator,
  createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator, SafeAreaView, DrawerItems,
} from "react-navigation";
import { Icon } from "react-native-elements";

import SettingsStack from "./SettingsStack";
import CatalogStack from "./CatalogStack"
import FriendStack from "./FriendStack";
import LikeStack from "./LikeStack";
import {store} from "../App";
import {Platform, View, Text, StyleSheet, ScrollView, Image} from "react-native";
import {getAvatar} from "../../avatars/avatar";
import DrawerNavigator from "../components/DrawerNavigator";

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

const MainTabsAndroid = createDrawerNavigator(
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
      navigationOptions: (navigation) => ({
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            name='settings'
            color={tintColor}
          />
        ),
      }),
    }
  },
  {
    initialRouteName: 'Catalogs',
    contentComponent: (props) => <DrawerNavigator navProps={props} user={store.getState().user}/>
  },
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

