import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer, NavigationActions
} from "react-navigation";

import CatalogList from "./CatalogStack/CatalogList";
import TopBar from "../components/TopBar";

const CatalogsStack = createAppContainer(createStackNavigator(
  {
    CatalogList: {
      screen: () => <CatalogList />,
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
    Catalog: {
      screen: () => <CatalogList/>,
      navigationOptions: () => ({
        header: (props) =>
          <TopBar
            title="Catalog"
            onPressLeft={() => {props.navigation.dispatch(NavigationActions.back())}}
            onPressRight={() => {}}
          />,
      }),
    },
  },
  {
    initialRouteName: 'CatalogList',
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

