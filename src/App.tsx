import React, {Component} from 'react';
import {PixelRatio, Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import NfcManager from 'react-native-nfc-manager'

import Login from "./screens/Login";
import Main from "./screens/Main";
import Auth from "./firebaseAPI/auth";
import Signin from "./screens/Signin";
import {StoreFactory} from "./redux/StoreFactory";

const storeFactory = new StoreFactory();
export const store = storeFactory.createStore();

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
    NfcManager.isSupported()
      .then((supp) => {
        store.dispatch({
          type: "DEVICE_INFO",
          pixelRatio: PixelRatio.get(),
          os: Platform.OS,
          nfc: supp
        })
      })
      .catch(err => console.warn(err))
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