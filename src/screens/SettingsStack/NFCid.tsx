import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image, StyleSheet, ListView, Modal} from 'react-native';
import {NavigationActions, NavigationScreenProp, withNavigation} from 'react-navigation';
import NfcManager, {ByteParser, Ndef} from "react-native-nfc-manager";

import {std} from "../../style";

interface AvatarsProps {
  navigation: NavigationScreenProp<object>;
}

interface AvatarsState {
  modal: boolean;
  textModal: string;
}

class NFCid extends Component<AvatarsProps, AvatarsState> {

  constructor(props: AvatarsProps) {
    super(props);
    this.state = {
      modal: false,
      textModal: "",
    }
  }

  public render() {
    return (
      <View style={std.screen}>
        <Text style={std.title}>
          Setta un id al tuo tag
        </Text>
        <TouchableOpacity
          style={std.button}
          onPress={this.addID}>
          <Text style={std.textButton}>Set id tag NFC</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => {this.setState({modal: false})}}
        >
          <View style={std.modal}>
            <View style={std.card}>
              <Text style={std.text}>{this.state.textModal}</Text>

              { this.state.textModal === "Tag pronto!" &&
              <TouchableOpacity
                style={[std.modalButton]}
                onPress={() => {
                  this.setState({modal: false});
                }}>
                <Text style={std.text}>Ok!</Text>
              </TouchableOpacity>
              }

              { this.state.textModal !== "Tag pronto!" &&
              <TouchableOpacity
                style={std.modalButton}
                onPress={() => {
                  this.setState({modal: false});
                  NfcManager.cancelNdefWrite();
                  this.unreg();
                  this.stop();
                }}>
                <Text style={std.text}>Annulla</Text>
              </TouchableOpacity>
              }
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  private write(tagID: string){
    this.setState({textModal: "Sto riscrivendo il tag..."});
    const mess = Ndef.encodeMessage([Ndef.textRecord(tagID)]);
    NfcManager.requestNdefWrite(mess)
      .then(() => {
          this.setState({textModal: "Tag pronto!"});
          this.unreg();
          this.stop();
        }
      )
      .catch(err => {
        console.warn(err);
      })
  }

  private addID = () => {
    this.setState({modal: true, textModal: "Avvicina il tag"});
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


  private unreg = () => {
    console.warn("unregister");
    NfcManager.unregisterTagEvent();
  }

  private stop = () => {
    console.warn("Stop");
    NfcManager.stop();
  }

}

export default withNavigation(NFCid);


const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between',
  },
  icon: {
    width: 100,
    height: 100,
    alignContent: "center",
    justifyContent: 'center',

  },
  now: {

  },
  pic: {
    width: 80,
    resizeMode: "contain",
  }
});
