import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer, NavigationActions, NavigationScreenProp, NavigationStateRoute, NavigationParams
} from "react-navigation";

import TopBar from "../components/TopBar";
import Settings from "./SettingsStack/Settings";
import Avatars from "./SettingsStack/Avatars";
import NFCid from "./NFCStack/ReadTag";
import NFCformat from "./NFCStack/NFCformat";
import License from "./SettingsStack/License";
import Contattaci from "./SettingsStack/Contattaci";


const SettingsStack = createAppContainer(createStackNavigator(
  {
    Settings: {
      screen: () => <Settings/>,
      navigationOptions: () => ({
        header: (props: any) =>
          <TopBar
            title="Impostazioni"
            iconLeft={"menu"}
            onPressLeft={() => props.navigation.toggleDrawer()} // TODO: only if android
          />,
      }),
    },
    Avatars: {
      screen: () => <Avatars/>,
      navigationOptions: (props: any) => ({
        header: () =>
          <TopBar
            title={"Avatar"}
            iconLeft={"chevron-left"}
            onPressLeft={() => {props.navigation.dispatch(NavigationActions.back())}}
          />,
      }),
    },
    Contattaci: {
      screen: () => <Contattaci/>,
      navigationOptions: (props: any) => ({
        header: () =>
          <TopBar
            title={"Contattaci"}
            iconLeft={"chevron-left"}
            onPressLeft={() => {
              props.navigation.dispatch(NavigationActions.back())
            }}
          />,
      }),
    },
    License: {
      screen: () => <License/>,
      navigationOptions: (props: any) => ({
        header: () =>
          <TopBar
            title={"Licenze"}
            iconLeft={"chevron-left"}
            onPressLeft={() => {
              props.navigation.dispatch(NavigationActions.back())
            }}
          />,
      }),
    }
  },
  {
    initialRouteName: 'Settings',
  }
));

interface SettingsStackProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

export default class SettingStack extends Component<SettingsStackProps> {

  static router = SettingsStack.router;

  public render() {
    return (
      <SettingsStack navigation={this.props.navigation}/>
    )
  }
}

