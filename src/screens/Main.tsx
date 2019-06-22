import React, {Component} from 'react';
import {
  createBottomTabNavigator,
  createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator, SafeAreaView, DrawerItems,
} from "react-navigation";
import { Icon } from "react-native-elements";

import SettingsStack from "./SettingsStack";
import CatalogStack from "./CatalogStack"
import FriendStack from "./FriendStack";
import NFCStack from "./NFCStack";
import {store} from "../App";
import {Platform, View, Text, StyleSheet, ScrollView, Image} from "react-native";
import DrawerNavigator from "../components/DrawerNavigator";
import {def, std} from "../style";

// iconlist only material icons https://oblador.github.io/react-native-vector-icons/

const MainTabsIOS = createBottomTabNavigator(
  {
    'Contatti': {
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
    'Cataloghi': {
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
    'NFC': {
      screen: NFCStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            name='nfc'
            color={tintColor}
          />
        )
      })
    },
    'Impostazioni': {
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
    initialRouteName: 'Cataloghi',
  }
);

const MainTabsAndroid = createDrawerNavigator(
  {
    'Contatti': {
      screen: FriendStack,
      navigationOptions: () => ({
        drawerLabel: ({tintColor}: any) => (
          <Text style={[std.text, {color: tintColor}]}>Contatti</Text>
        ),
        drawerIcon: ({tintColor}: any) => (
          <Icon
            name='people'
            color={tintColor}
          />
        )
      })
    },
    'Cataloghi': {
      screen: CatalogStack,
      navigationOptions: () => ({
        drawerLabel: ({tintColor}: any) => (
          <Text style={[std.text, {color: tintColor}]}>Cataloghi</Text>
        ),
        drawerIcon: ({tintColor}: any) => (
          <Icon
            name='assignment'
            color={tintColor}
          />
        )
      })
    },
    'NFC': {
      screen: NFCStack,
      navigationOptions: () => ({
        drawerLabel: ({tintColor}: any) => (
          <Text style={[std.text, {color: tintColor}]}>NFC</Text>
        ),
        drawerIcon: ({tintColor}: any) => (
          <Icon
            name='nfc'
            color={tintColor}
          />
        )
      })
    },
    'Impostazioni': {
      screen: SettingsStack,
      navigationOptions: () => ({
        drawerLabel: ({tintColor}: any) => (
          <Text style={[std.text, {color: tintColor}]}>Impostazioni</Text>
        ),
        drawerIcon: ({tintColor}: any) => (
          <Icon
            name='settings'
            color={tintColor}
          />
        ),
      }),
    }
  },
  {
    initialRouteName: 'Cataloghi',
    contentComponent: (props) => <DrawerNavigator navProps={props} user={store.getState().user}/>,
    contentOptions: {
      activeTintColor: def.theme1,
      inactiveTintColor: def.black,
    }
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


