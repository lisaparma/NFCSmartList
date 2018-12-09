import React, {Component} from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";

import Catalogs from "./Catalogs";
import Settings from "./Settings";

// TODO: if android  createDrawerNavigator
// iconlist only material https://oblador.github.io/react-native-vector-icons/
const MainTabs = createBottomTabNavigator(
  {
    'Catalogs': {
      screen: Catalogs,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}: any) => (
          <Icon
            name='looks'
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

