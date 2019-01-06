import React, {Component} from 'react';
import {Button, Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { withNavigation } from 'react-navigation';
import Auth from "../firebaseAPI/auth";
import TopBar from "../components/TopBar";
import {ByteParser, Ndef} from "react-native-nfc-manager";
import NfcManager from "react-native-nfc-manager";
import {store} from "../App";

import {info, std} from "../style";
import {IEditAvatar, IEditUsername} from "../redux/action";
import Database from "../firebaseAPI/database";
import {getAvatar} from "../../avatars/avatar";

interface SettingsProps {
}

interface SettingsState {
  edit: boolean;
  username: string;
  email: string;
  avatar: number;
}

class Settings extends Component<SettingsProps, SettingsState> {

  constructor(props: SettingsProps) {
    super(props);
    const user = store.getState().user;
    this.state = {
      edit: false,
      username: user.username,
      email: user.email,
      avatar: 36
    }
  }

  public render() {
    return (
      <View style={std.screen}>
        <TopBar title={"Settings"}/>
        <Image
          style={{width: 100, height: 100}}
          source={getAvatar(this.state.avatar)}
        />
        <View style={info.textBox}>
          <Text style={[std.text, info.t1]}>e-mail:</Text>
          <Text style={[std.text, info.t2]}>{this.state.email}</Text>
        </View>
        {!this.state.edit &&
          <View>
            <View style={info.textBox}>
              <Text style={[std.text, info.t1]}>Username:</Text>
              <Text style={[std.text, info.t2]}>{this.state.username}</Text>
            </View>
            <TouchableOpacity
              style={std.button}
              onPress={()=>{this.setState({edit: true})}}>
              <Text style={std.textButton}>Modifica username</Text>
            </TouchableOpacity>
          </View>
        }
        {this.state.edit &&
        <View>
          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>Username:</Text>
            <TextInput
              style={[std.text, info.t2]}
              onChangeText={text => this.setState({username: text})}>
              {this.state.username}
            </TextInput>
          </View>
          <TouchableOpacity
            style={std.button}
            onPress={this.editUser}>
            <Text style={std.textButton}>Fatto</Text>
          </TouchableOpacity>
        </View>
        }
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

  private editUser = () => {
    this.setState({edit: false});
    store.dispatch<IEditUsername>({
      type: "EDIT_USERNAME",
      username: this.state.username,
    });
    Database.editUser(this.state.username);
  };

  private editAvatar = () => {
    store.dispatch<IEditAvatar>({
      type: "EDIT_AVATAR",
      avatar: this.state.avatar,
    });
    Database.editAvatar(this.state.avatar);
  };

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