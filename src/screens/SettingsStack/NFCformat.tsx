import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image, StyleSheet, ListView, Modal} from 'react-native';
import {
  NavigationActions,
  NavigationParams,
  NavigationScreenProp,
  NavigationStateRoute,
  withNavigation
} from 'react-navigation';
import NfcManager, {ByteParser, Ndef} from "react-native-nfc-manager";

import {std} from "../../style";

interface AvatarsProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface AvatarsState {
  modal: boolean;
  textModal: string;
}

class NFCformat extends Component<AvatarsProps, AvatarsState> {

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
          Formatta il tuo tag
        </Text>
        <TouchableOpacity
          style={std.button}
          onPress={this.format}>
          <Text style={std.textButton}> Formatta</Text>
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

  private format = () => {
    this.setState({modal: true, textModal: "Avvicina il tag"});
    NfcManager.start()
      .then(() => {
        NfcManager.registerTagEvent(
          tag => {
            this.setState({textModal: "Sto formattando il tag..."});
            NfcManager.requestNdefWrite(null, {format: true})
              .then(() => {
                  this.setState({textModal: "Tag pronto!"});
                  this.unreg();
                  this.stop();
                }
              )
              .catch(err => {
                console.warn(err);
              })
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

export default withNavigation(NFCformat);


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
