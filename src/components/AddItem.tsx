import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput} from 'react-native';
import {Icon} from "react-native-elements";

import {store} from "../App";
import {IAddItem} from "../redux/action";
import Database from "../firebaseAPI/database";
import NfcManager, {ByteParser, Ndef} from "react-native-nfc-manager";
import {card} from "../style";

interface AddItemProps {
  cid: string;
}

interface AddItemState {
  name: string;
  tag: string;
}

export default class AddItem extends Component<AddItemProps, AddItemState> {

  constructor(props: AddItemProps) {
    super(props);
    this.state = {
      name: "",
      tag: "",
    }
  }

  public render() {
    return (
      <View style={[card.container, card.contItem]}>
        <TextInput
          style={card.centerBox}
          placeholder="Item"
          onChangeText={text => this.setState({name: text})}
        >{this.state.name}</TextInput>
        <TouchableOpacity
          style={card.icon}
          onPress={this.addTag}>
          <Icon
            name={"nfc"}
            size={30}
            color={this.state.tag !== ""? "#48a23a" : "#bcbdbe"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={card.icon}
          onPress={this.addItem}>
        <Icon
          name={"add-circle-outline"}
          size={30}
          />
        </TouchableOpacity>
      </View>
    );
  }

  private addItem = () => {
    if(this.state.name !== "") {
      var uuid = require('react-native-uuid');
      const iid = uuid.v4();
      store.dispatch<IAddItem>({
        type: "ADD_ITEM",
        cid: this.props.cid,
        iid: iid,
        name: this.state.name,
        description: "",
        tag: this.state.tag,
      });
      Database.addItem(this.props.cid, iid, this.state.name, "", this.state.tag);
      this.setState({name: "", tag: ""});
    }
  };

  private read() {
    NfcManager.registerTagEvent(
      tag => {this.setState({tag: ByteParser.byteToString(tag.ndefMessage[0].payload)}); },
      'Hold your device over the tag',
      true,
    )
  }

  private write(tagID: string) {
    const mess = Ndef.encodeMessage([Ndef.textRecord(tagID)]);

    NfcManager.requestNdefWrite(mess)
      .then(() => console.warn('write completed'))
      .catch(err => console.warn("not" + err))
  }

  private addTag = () => {
    NfcManager.start({
      onSessionClosedIOS: () => {
        console.warn('ios session closed');
      }
    })
      .then(() => {
        if(store.getState().user.os === "ios") {
          this.read();
        } else {
          NfcManager.registerTagEvent(
            tag => {
              this.setState({tag: ByteParser.byteToString(tag.ndefMessage[0].payload)});
                // var uuid = require('react-native-uuid');
                // const tagID = uuid.v4();
                // this.write(tagID);
                // this.setState({tag: tagID});
            },
            'Hold your device over the tag',
            true,
          )
        }
      })
      .catch(error => {
        console.warn(error);
      })
  }

}