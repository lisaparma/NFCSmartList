import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {Store} from 'redux';
import Auth from "../firebaseAPI/auth";
import {IStore} from "../redux/IStore";


interface AppProps {
  store: Store<IStore>
}

interface AppState {

}

export default class Main extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
    }
  }

  public render() {
    console.warn(this.props.store.getState().user)
    return (
      <View style={styles.container}>
        <Text>Ciao</Text>
      <Button
        title="Esci"
        onPress={() => {Auth.logout()}}
      />
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
