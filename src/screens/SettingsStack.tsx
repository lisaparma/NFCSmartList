import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer, NavigationActions, NavigationScreenProp, NavigationStateRoute, NavigationParams
} from "react-navigation";

import TopBar from "../components/TopBar";
import Settings from "./SettingsStack/Settings";
import Avatars from "./SettingsStack/Avatars";
import NFCid from "./SettingsStack/NFCid";
import NFCformat from "./SettingsStack/NFCformat";
import License from "./SettingsStack/License";

const SettingsStack = createAppContainer(createStackNavigator(
  {
    Settings: {
      screen: () => <Settings/>,
      navigationOptions: () => ({
        header: (props: any) =>
          <TopBar
            title="Settings"
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
    NFCid: {
      screen: () => <NFCid/>,
      navigationOptions: (props: any) => ({
        header: () =>
          <TopBar
            title={"ID"}
            iconLeft={"chevron-left"}
            onPressLeft={() => {
              props.navigation.dispatch(NavigationActions.back())
            }}
          />,
      }),
    },
    NFCformat: {
      screen: () => <NFCformat/>,
      navigationOptions: (props: any) => ({
        header: () =>
          <TopBar
            title={"Formatta"}
            iconLeft={"chevron-left"}
            onPressLeft={() => {
              props.navigation.dispatch(NavigationActions.back())
            }}
          />,
      }),
    },
    FAQ: {
      screen: () => <License/>,
      navigationOptions: (props: any) => ({
        header: () =>
          <TopBar
            title={"FAQ"}
            iconLeft={"chevron-left"}
            onPressLeft={() => {
              props.navigation.dispatch(NavigationActions.back())
            }}
          />,
      }),
    },
    Contattaci: {
      screen: () => <License/>,
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
    Privacy: {
      screen: () => <License/>,
      navigationOptions: (props: any) => ({
        header: () =>
          <TopBar
            title={"Privacy"}
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
            title={"License"}
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

