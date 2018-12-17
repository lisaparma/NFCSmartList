import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import Catalogs from "./CatalogStack/Catalogs";
import TopBar from "../components/TopBar";
import {TabBarIOS, View} from "react-native";

const CatalogsStack = createAppContainer(createStackNavigator(
  {
    Catalogs: {
      screen: () => <Catalogs/>,
      navigationOptions: () => ({
        header: (props) =>
                <TopBar
                  title="Catalogs"
                  // onPressLeft={() => props.navigation.toggleDrawer()} // TODO: only if android
                  //onPressLeft={() => {}}
                  onPressRight={() => {}}
                />,
      }),
    },
  },
  {
    initialRouteName: 'Catalogs',
  }
));

export default class CatalogStack extends Component {

  static router = CatalogsStack.router;

  public render() {
    return (
      <CatalogsStack navigation={this.props.navigation}/>
    )
  }
}

