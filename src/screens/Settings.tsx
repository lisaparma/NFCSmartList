import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { withNavigation } from 'react-navigation';
import {createStore, Store} from 'redux';

interface AppProps {
}

interface AppState {
}

class Settings extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }

}

export default withNavigation(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666666',
  },
});
