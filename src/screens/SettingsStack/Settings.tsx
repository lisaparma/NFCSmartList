import React, {Component} from 'react';
import {Image,Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import Auth from "../../firebaseAPI/auth";
import {ByteParser, Ndef} from "react-native-nfc-manager";
import NfcManager from "react-native-nfc-manager";
import {store} from "../../App";

import {card, info, std} from "../../style";
import {IEditUsername} from "../../redux/action";
import Database from "../../firebaseAPI/database";
import {getAvatar} from "../../../avatars/avatar";
import {IUser} from "../../redux/IStore";
import {Icon} from "react-native-elements";

interface SettingsProps {
  navigation: NavigationScreenProp<object>;
}

interface SettingsState {
  edit: boolean;
  username: string;
  email: string;
  avatar: number;
}

class Settings extends Component<SettingsProps, SettingsState> {

  private mUnsubscribeFromStore: any;

  constructor(props: SettingsProps) {
    super(props);
    const user = store.getState().user;
    this.state = {
      edit: false,
      username: user.username,
      email: user.email,
      avatar: store.getState().user.avatar
    }
  }

  public componentDidMount(): void {
    this.mUnsubscribeFromStore = store.subscribe(this.onStoreChange);
  }

  public componentWillUnmount(): void {
    this.mUnsubscribeFromStore();
  }

  public render() {
    return (
      <View style={std.screen}>
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
            <View style={[info.textBox, {justifyContent: "space-between"}]}>
              <Text style={[std.text, info.t1]}>Username:</Text>
              <Text style={[std.text, info.t2, {flex:1}]}>{this.state.username}</Text>
              <TouchableOpacity
                style={card.icon}
                onPress={()=>{this.setState({edit: true})}}>
                <Icon
                  color={"#a8aaaa"}
                  name={"edit"}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
        {this.state.edit &&
        <View>
          <View style={[info.textBox, {justifyContent: "space-between"}]}>
            <Text style={[std.text, info.t1]}>Username:</Text>
            <TextInput
              style={[std.text, info.t2, {flex:1}]}
              onChangeText={text => this.setState({username: text})}>
              {this.state.username}
            </TextInput>
            <TouchableOpacity
              style={card.icon}
              onPress={this.editUser}>
              <Icon
                color={"#88c25d"}
                name={"done"}
                size={30}
              />
            </TouchableOpacity>
          </View>
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
          onPress={()=>{this.props.navigation.navigate(
            "Avatars",
            {avatar: this.state.avatar})
          }}
            >
          <Text style={std.textButton}>Cambia avatar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={std.button}
          onPress={()=>{Auth.logout()}}>
          <Text style={std.textButton}>Esci</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private onStoreChange = () => {
    const currentState: IUser = store.getState().user;
    if(currentState.avatar !== this.state.avatar) {
      this.setState({
        avatar: currentState.avatar,
      });
    }
  };

  private editUser = () => {
    this.setState({edit: false});
    store.dispatch<IEditUsername>({
      type: "EDIT_USERNAME",
      username: this.state.username,
    });
    Database.editUser(this.state.username);
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