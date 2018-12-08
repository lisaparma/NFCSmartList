import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {createStore, Store} from 'redux';

import {reducer} from "./redux/reducer";
import {IStore} from "./redux/IStore";

import Login from "./screens/Login";
import Main from "./screens/Main";
import Auth from "./firebaseAPI/auth";

export const store: Store<IStore> = createStore(reducer);


interface AppProps {
}

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
        <Main store = {store}/>
      );
    } else {
      return (
        <Login/>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
