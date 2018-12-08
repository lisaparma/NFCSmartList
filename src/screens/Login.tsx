import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {createStore, Store} from 'redux';

import Auth from "../firebaseAPI/auth";


interface AppProps {
}

interface AppState {
  username: string;
  password: string;
}

export default class Login extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter username"
          onChangeText={text => this.setState({username: text})}
        />
        <TextInput
          placeholder="Enter password"
          onChangeText={text => this.setState({password: text})}
        />
        <Button
          title="Entra"
          onPress={() => {Auth.signIn(this.state.username, this.state.password)}}
        />
        {/*<Button*/}
          {/*title="Registrati"*/}
          {/*onPress={() => {Auth.registerAccount(this.state.username, this.state.password)}}*/}
        {/*/>*/}

      </View>
    );
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
