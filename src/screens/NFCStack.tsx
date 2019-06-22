import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer, NavigationActions, NavigationScreenProp, NavigationStateRoute, NavigationParams
} from "react-navigation";

import TopBar from "../components/TopBar";
import LCatalogList from "./NFCStack/LCatalogList";
import NFCid from "./NFCStack/NFCid";
import NFCformat from "./NFCStack/NFCformat";
import NFCFunctionality from "./NFCStack/NFCFunctionality";

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

