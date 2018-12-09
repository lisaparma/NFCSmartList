import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {createStore, Store} from 'redux';

import Auth from "../firebaseAPI/auth";
import {withNavigation} from "react-navigation";


interface AppProps {}


interface AppState {
  username: string;
  password: string;
}

class Login extends Component<AppProps, AppState> {

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
        <Button
          title="Non sono registrato"
          onPress={()=>this.props.navigation.navigate("Signin")}/>

      </View>
    );
  }

}

export default withNavigation(Login);

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
