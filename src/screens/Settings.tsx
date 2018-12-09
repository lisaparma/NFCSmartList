import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { withNavigation } from 'react-navigation';

interface SettingsProps {
}

interface SettingsState {
}

class Settings extends Component<SettingsProps, SettingsState> {

  constructor(props: SettingsProps) {
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
    backgroundColor: '#F5FCFF',
  },
});
