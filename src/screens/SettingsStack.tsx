import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer, NavigationActions
} from "react-navigation";

import TopBar from "../components/TopBar";
import Settings from "./SettingsStack/Settings";
import Avatars from "./SettingsStack/Avatars";

const SettingsStack = createAppContainer(createStackNavigator(
  {
    Settings: {
      screen: () => <Settings/>,
      navigationOptions: () => ({
        header: (props: any) =>
          <TopBar
            title="Settings"
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
  },
  {
    initialRouteName: 'Settings',
  }
));

export default class SettingStack extends Component {

  static router = SettingsStack.router;

  public render() {
    return (
      <SettingsStack navigation={this.props.navigation}/>
    )
  }
}

