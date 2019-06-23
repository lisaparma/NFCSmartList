import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer, NavigationActions, NavigationScreenProp, NavigationStateRoute, NavigationParams
} from "react-navigation";

import TopBar from "../components/TopBar";
import NFCFunctionality from "./NFCStack/NFCFunctionality";
import ReadTag from "./NFCStack/ReadTag";
import WriteTag from "./NFCStack/WriteTag";

const NFCsStack = createAppContainer(createStackNavigator(
  {
    NFCFunctionality: {
      screen: () => <NFCFunctionality />,
      navigationOptions: () => ({
        header: (props: any) =>
          <TopBar
            title="NFC"
            iconLeft={"menu"}
            onPressLeft={() => props.navigation.toggleDrawer()} // TODO: only if android
          />,
      }),
    },
    readTag: {
      screen: () => <ReadTag/>,
      navigationOptions: (props: any) => ({
        header: () =>
          <TopBar
            title={"Lettura tag"}
            iconLeft={"chevron-left"}
            onPressLeft={() => {
              props.navigation.dispatch(NavigationActions.back())
            }}
          />,
      }),
    },
    writeTag: {
      screen: () => <WriteTag/>,
      navigationOptions: (props: any) => ({
        header: () =>
          <TopBar
            title={"Scrittura tag"}
            iconLeft={"chevron-left"}
            onPressLeft={() => {
              props.navigation.dispatch(NavigationActions.back())
            }}
          />,
      }),
    }
  },
  {
    initialRouteName: 'NFCFunctionality',
  }
));

interface NFCStackProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

export default class NFCStack extends Component<NFCStackProps> {

  static router = NFCsStack.router;

  public render() {
    return (
      <NFCsStack navigation={this.props.navigation}/>
    )
  }
}

