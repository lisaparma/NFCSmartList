import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {Store} from 'redux';
import {createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator, SafeAreaView, createAppContainer} from "react-navigation";

import Auth from "../firebaseAPI/auth";
import {IStore} from "../redux/IStore";
import Catalogs from "./Catalogs";
import Settings from "./Settings";


const tabbarVisible = (navigation) => {
  const { routes } = navigation.state;
  let showTabbar = true;
  if(routes) {
    routes.forEach((route) => {
      if (route.routeName === 'ChatRoom'
        || route.routeName === "BuddyEdit")
      {
        showTabbar = false;
      }
    });
  }
  return showTabbar;
};

// TODO: if android  createMaterialTopTabNavigator
const MainTabs = createBottomTabNavigator(
  {
    'Catalogs': {
      screen: Catalogs,
      navigationOptions: () => ({
        // tabBarIcon: ({tintColor}) => (
        //   <Icon
        //     icon="SharedToMeBold"
        //     color={tintColor}
        //     size={3*Style.UM}
        //   />
        // )
      })
    },
    'Settings': {
      screen: Settings,
      navigationOptions: () => ({
        // tabBarIcon: ({tintColor}) => (
        //   <ZxIcon
        //     icon="SettingsBold"
        //     color={tintColor}
        //     size={2.7*Style.UM}
        //   />
        // )
      })
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: tabbarVisible(navigation),
    }),
    // tabBarOptions: {
    //   activeTintColor: Style.skinData.TopHeaderColor,
    //   inactiveTintColor: Style.Color4,
    //   style: {
    //     backgroundColor:Style.Color2,
    //     height: 5*Style.UM,
    //     padding: 0.5*Style.UM,
    //   },
    // },
  }
);

const Navigator = createAppContainer(MainTabs);

interface AppProps {
  store: Store<IStore>
}

interface AppState {

}

export default class Main extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <Navigator/>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
