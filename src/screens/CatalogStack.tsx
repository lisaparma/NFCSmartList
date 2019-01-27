import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer, NavigationActions, NavigationScreenProp, NavigationStateRoute, NavigationParams
} from "react-navigation";

import CatalogList from "./CatalogStack/CatalogList";
import TopBar from "../components/TopBar";
import Catalog from "./CatalogStack/Catalog";
import AddCatalog from "./CatalogStack/AddCatalog";
import DetailsItem from "./CatalogStack/DetailsItem";
import DetailsCatalog from "./CatalogStack/DetailsCatlog";

const CatalogsStack = createAppContainer(createStackNavigator(
  {
    CatalogList: {
      screen: () => <CatalogList />,
      navigationOptions: () => ({
        header: (props: any) =>
          <TopBar
            title="Catalogs"
            iconLeft={"menu"}
            onPressLeft={() => props.navigation.toggleDrawer()} // TODO: only if android
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
            title={"Avatar"}
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
    DetailsCatalog: {
      screen: () => <DetailsCatalog/>,
      navigationOptions: () => ({
        header: (props: any) =>
          <TopBar
            title="Details catalog"
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

interface CatalogStackProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

export default class CatalogStack extends Component<CatalogStackProps> {

  static router = CatalogsStack.router;

  public render() {
    return (
      <CatalogsStack navigation={this.props.navigation}/>
    )
  }
}

