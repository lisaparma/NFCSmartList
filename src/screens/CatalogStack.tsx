import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import Catalogs from "./Catalogs";
import {View} from "react-native";

const CatalogsStack = createAppContainer(createStackNavigator(
  {
    Catalogs: {
      screen: () => <Catalogs/>,
      navigationOptions: () => ({
        header: <View/>,
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

