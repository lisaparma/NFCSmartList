import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import {View} from "react-native";
import TopBar from "../components/TopBar";

const LikesStack = createAppContainer(createStackNavigator(
  {
    Likes: {
      screen: () => <View/>,
      navigationOptions: () => ({
        header: (props) =>
          <TopBar
            title="Likes"
            // onPressLeft={() => props.navigation.toggleDrawer()} // TODO: only if android
            onPressRight={() => {}}
          />,
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

