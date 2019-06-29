import React, {Component} from 'react';
import {Image, PixelRatio, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import NfcManager from 'react-native-nfc-manager'

import Login from "./screens/Login";
import Main from "./screens/Main";
import Auth from "./firebaseAPI/auth";
import Signin from "./screens/Signin";
import {StoreFactory} from "./redux/StoreFactory";
import Swiper from "react-native-swiper";
import {def, log, std} from "./style";
import {IAuthentication, IOld} from "./redux/action";


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
    },
  },
  {
    initialRouteName: 'Login',
  }
));

interface AppProps {}

interface AppState {
  auth: boolean;
  new: boolean;
}

export default class App extends Component<AppProps, AppState> {

  private mUnsubscribeFromStore: any;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      auth: false,
      new: false,
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
    if (currentState.user.isNewUser !== this.state.new) {
      this.setState({
        new: currentState.user.isNewUser,
      });

    }
  };
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: def.theme1,
    padding: 10
  },
  text: {
    color: def.white,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "center"
  },
   image: {
     width: 200,
     height: 300,
     margin: 10
   }
})