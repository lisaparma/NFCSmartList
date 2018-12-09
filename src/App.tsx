import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStore, Store} from 'redux';
import {createStackNavigator, createAppContainer} from "react-navigation";


import {reducer} from "./redux/reducer";
import {IStore} from "./redux/IStore";

import Login from "./screens/Login";
import Main from "./screens/Main";
import Auth from "./firebaseAPI/auth";
import Signin from "./screens/Signin";

export const store: Store<IStore> = createStore(reducer);

const LogStack = createAppContainer(
  createStackNavigator(
  {
    Login: {
      screen: () => <Login/>,
      navigationOptions: () => ({
        header: <View/>,
      }),
    },
    Signin: {
      screen: () => <Signin/>,
      navigationOptions: () => ({
        header: <View/>,
      }),
    }
  },
  {
    initialRouteName: 'Login',
  }
));

interface AppProps {}

interface AppState {
  auth: boolean;
}

export default class App extends Component<AppProps, AppState> {

  private mUnsubscribeFromStore: any;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      auth: false,
    };
  }

  public componentDidMount(): void {
    this.mUnsubscribeFromStore = store.subscribe(this.onStoreChange);
    Auth.getUserInfo();
  }

  public componentWillUnmount(): void {
    this.mUnsubscribeFromStore();
  }

  public render() {
    if(this.state.auth) {
      return (
        <Main/>
      );
    } else {
      return (
        <LogStack/>
      );
    }
  }

  private onStoreChange = () => {
    const currentState = store.getState();
    if (currentState.auth !== this.state.auth) {
      this.setState({
        auth: currentState.auth,
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
