import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Modal, TextInput} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from 'react-navigation';
import NfcManager, {ByteParser, Ndef} from "react-native-nfc-manager";

import {def, info, std} from "../../style";
import {cancelWriteTag, registerTag, unregisterNFC, writeTag, formatTag} from "../../NFCapi";
import {bool} from "prop-types";

interface WriteTagProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface WriteTagState {
  modal: boolean,
  textModal: string | undefined
  text: string | null
}

class WriteTag extends Component<WriteTagProps, WriteTagState> {

  constructor(props: WriteTagProps) {
    super(props);
    this.state = {
      modal: false,
      textModal: undefined,
      text: ""
    }
  }

  public render() {
    return (
      <View style={std.page}>
        <Text style={[std.text, info.t1]}>Testo:</Text>
        <TextInput
          value={this.state.text}
          style={[std.text, info.t2]}
          placeholder="Inserisci un testo"
          onChangeText={text => this.setState({text: text})}
          multiline={true}
        />

        <TouchableOpacity
          style={[std.button, this.state.text === "" && std.buttonDisabled]}
          disabled={this.state.text ===  ""}
          onPress={() => {
            this.setState({modal:true, textModal: "Avvicina un tag NFC..."});
            this.writeTag(this.state.text);
          }}>
          <Text style={std.textButton}>Scrivi</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => {this.setState({modal: false})}}
        >
          <View style={std.modal}>
            <View style={std.card}>
              <Text style={std.textModal}>{this.state.textModal}</Text>
              {((this.state.textModal === "Avvicina un tag NFC...") ||
                (this.state.textModal === "Avvicina di nuovo il tag NFC...")) &&
                <View style={std.boxButton}>
                  <TouchableOpacity
                    style={std.modalButton2}
                    onPress={() => {
                      this.setState({modal: false});
                      cancelWriteTag()
                        .then(log => console.log(log))
                        .catch(er => console.warn(er));
                    }}>
                    <Text style={std.text}>Annulla</Text>
                  </TouchableOpacity>
                </View>
              }
              {this.state.textModal === "Scrittura completata!" &&
                <View style={std.boxButton}>
                  <TouchableOpacity
                    style={std.modalButton1}
                    onPress={() => {
                      this.setState({modal: false});
                    }}>
                    <Text style={std.text}>Ok</Text>
                  </TouchableOpacity>
                </View>
              }
              {this.state.textModal === "Errore nella scrittura! Il tag potrebbe essere compromesso o di solo lettura" &&
                <View style={std.boxButton}>
                  <TouchableOpacity
                    style={std.modalButton1}
                    onPress={() => {
                      writeTag(this.state.text)
                    }}>
                    <Text style={std.text}>Riprova</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={std.modalButton2}
                    onPress={() => {
                      this.setState({modal: false});
                    }}>
                    <Text style={std.text}>Annulla</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
        </Modal>

      </View>
    );
  }


  private writeTag = (text: string) => {
    this.setState({modal: true, textModal: "Avvicina un tag NFC..."});
    registerTag()
      .then( (tag) => {
        this.setState({textModal: "Avvicina di nuovo il tag NFC..."});
        console.log(tag);
        let form = false;
        for(let i=0; i<tag.techTypes.length; i++) {
          if(tag.techTypes[i] === "android.nfc.tech.NdefFormatable"){
            form=true;
            formatTag(text)
              .then((tag) => this.setState({
                textModal: "Scrittura completata!",
                text: ""
              }))
              .catch(er => {
                this.setState({textModal: "Errore nella scrittura! Il tag potrebbe essere compromesso o di solo lettura"});
                unregisterNFC()
                  .then(log => console.log(log))
                  .catch(er => console.warn(er));
                console.log(er)});
          }
        }
        if(!form) {
          writeTag(text)
            .then((tag) => this.setState({
              textModal: "Scrittura completata!",
              text: ""
            }))
            .catch(er => {
              this.setState({textModal: "Errore nella scrittura! Il tag potrebbe essere compromesso o di solo lettura"});
              unregisterNFC()
                .then(log => console.log(log))
                .catch(er => console.warn(er));
              console.log(er)});
        }
      })
      .catch((er) => console.log(er))
  }

}

export default withNavigation(WriteTag);


const styles = StyleSheet.create({

});
