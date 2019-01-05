import React, {Component} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { withNavigation } from 'react-navigation';
import Auth from "../firebaseAPI/auth";
import TopBar from "../components/TopBar";
import {ByteParser, Ndef} from "react-native-nfc-manager";
import NfcManager from "react-native-nfc-manager";
import {store} from "../App";
import {std} from "../style";

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
      <View style={std.screen}>
        <TopBar title={"Settings"}/>
        {store.getState().user.os === "android" &&
          <TouchableOpacity
            style={std.button}
            onPress={this.addID}>
            <Text style={std.textButton}>Set id tag NFC</Text>
          </TouchableOpacity>
        }
        <TouchableOpacity
          style={std.button}
          onPress={()=>{Auth.logout()}}>
          <Text style={std.textButton}>Esci</Text>
        </TouchableOpacity>
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