import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import Catalogs from "./Catalogs";
import {View} from "react-native";

const LikesStack = createAppContainer(createStackNavigator(
  {
    Likes: {
      screen: () => <View/>,
      navigationOptions: () => ({
        header: <View/>,
      }),
    },
  },
  {
    initialRouteName: 'Likes',
  }
));

export default class LikeStack extends Component {

  static router = LikesStack.router;

  public render() {
    return (
      <LikesStack navigation={this.props.navigation}/>
    )
  }
}

