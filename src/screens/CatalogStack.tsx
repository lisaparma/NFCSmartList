import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer, NavigationActions
} from "react-navigation";

import CatalogList from "./CatalogStack/CatalogList";
import TopBar from "../components/TopBar";
import Catalog from "./CatalogStack/Catalog";
import AddCatalog from "./CatalogStack/AddCatalog";
import DetailsItem from "./CatalogStack/DetailsItem";

const CatalogsStack = createAppContainer(createStackNavigator(
  {
    CatalogList: {
      screen: () => <CatalogList />,
      navigationOptions: () => ({
        header: (props: any) =>
          <TopBar
            title="Catalogs"
            // onPressLeft={() => props.navigation.toggleDrawer()} // TODO: only if android
            //onPressLeft={() => {}}
            iconRight={"add"}
            onPressRight={() => {props.navigation.navigate("AddCatalog")}}
          />,
      }),
    },
    Catalog: {
      screen: () => <Catalog/>,
      navigationOptions: (props: any) => ({
        header: () =>
          <TopBar
            title={props.navigation.getParam("name")}
            iconLeft={"chevron-left"}
            onPressLeft={() => {props.navigation.dispatch(NavigationActions.back())}}
            iconRight={"more-horiz"}
            onPressRight={() => {props.navigation.setParams({menu: !props.navigation.getParam("menu")})}}
          />,
      }),
    },
    AddCatalog: {
      screen: () => <AddCatalog/>,
      navigationOptions: () => ({
        header: (props: any) =>
          <TopBar
            title="Add catalog"
            iconLeft={"chevron-left"}
            onPressLeft={() => {props.navigation.dispatch(NavigationActions.back())}}
          />,
      }),
    },
    DetailsItem: {
      screen: () => <DetailsItem/>,
      navigationOptions: () => ({
        header: (props: any) =>
          <TopBar
            title="Details item"
            iconLeft={"chevron-left"}
            onPressLeft={() => {props.navigation.dispatch(NavigationActions.back())}}
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

