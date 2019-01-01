import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { withNavigation } from 'react-navigation';
import Auth from "../firebaseAPI/auth";
import TopBar from "../components/TopBar";
import {ByteParser, Ndef} from "react-native-nfc-manager";
import NfcManager from "react-native-nfc-manager";
import {store} from "../App";

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
        {store.getState().user.os === "android" &&
          <Button
            title={"Set id tag NFC"}
            onPress={this.addID}>
            Esci
          </Button>
        }
        <Button
          title={"Esci"}
          onPress={()=>{Auth.logout()}}>
          Esci
        </Button>
      </View>
    );
  }

  private write(tagID: string) {
    const mess = Ndef.encodeMessage([Ndef.textRecord(tagID)]);
    NfcManager.requestNdefWrite(mess)
      .then(() => console.warn('Write completed' + tagID))
      .catch(err => console.warn(err))
  }

  private addID = () => {
    NfcManager.start()
      .then(() => {
        NfcManager.registerTagEvent(
          tag => {
            var uuid = require('react-native-uuid');
            const tagID = uuid.v4();
            this.write(tagID);
          },
          'Hold your device over the tag',
          true,
        )
      })
      .catch(error => {
        console.warn(error);
      })
  }

}

export default withNavigation(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
