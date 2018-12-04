import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {createStore, Store} from 'redux';
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";

import firebase from 'react-native-firebase';

import {reducer} from "./redux/reducer";
import {IAuthentication} from "./redux/action";

export const store: Store<IStore> = createStore(reducer);



interface AppState {
  auth: boolean;
}

export default class App extends Component<AppState> {

constructor(props: IAppState) {
    super(props);
    this.state = {
      auth:false
    }
    firebase.auth().signInAnonymously()
	  .then((user) => {console.warn(user.user.isAnonymous);
  	});
  }

  public render() {
    return (
      <View style={styles.container}>
      <Text> ciao: {this.state.auth.toString()} </Text>
        <Button
          title="un bottone"
          onPress={this.onPress}/>
      </View>
    );
  }

  private onPress = () => {
    if (store.getState().auth) {
      store.dispatch<IAuthentication>({
        type: "AUTH",
        auth: false,
      });
    } else {
      store.dispatch<IAuthentication>({
        type: "AUTH",
        auth: true,
      });
    }
    this.setState({
      auth: store.getState().auth
    })
  }
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
