import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput} from 'react-native';
import {Icon} from "react-native-elements";

import {store} from "../App";
import {IAddItem} from "../redux/action";
import Database from "../firebaseAPI/database";
import NfcManager, {ByteParser, Ndef} from "react-native-nfc-manager";

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
    console.warn(this.state.tag);
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Item"
          onChangeText={text => this.setState({name: text})}
        >{this.state.name}</TextInput>
        <TouchableOpacity
          onPress={this.addTag}>
          <Icon
            name={"nfc"}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
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
        description: ""
      });
      Database.addItem(this.props.cid, iid, this.state.name, "");
      this.setState({name: ""});
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
          var uuid = require('react-native-uuid');
          const tagID = uuid.v4();
          NfcManager.registerTagEvent(
            tag => {
              this.setState({tag: ByteParser.byteToString(tag.ndefMessage[0].payload)});
              this.write(tagID)
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

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: "#bcbdbe",
    borderWidth: 0.5,
    margin: 5,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    shadowOffset:{  width: 5,  height: 5, },
    shadowColor: '#bcbdbe',
    shadowOpacity: 1.0,
    elevation: 5
  },
  input: {
    flex: 1
  },
  icon: {
    padding: 10
  }
});
