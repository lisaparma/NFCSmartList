import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { withNavigation } from 'react-navigation';
import Auth from "../firebaseAPI/auth";
import TopBar from "../components/TopBar";

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
        <TopBar title={"Settings"}/>
        <Button
          title={"Esci"}
          onPress={()=>{Auth.logout()}}>
          Esci
        </Button>
      </View>
    );
  }

}

export default withNavigation(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
