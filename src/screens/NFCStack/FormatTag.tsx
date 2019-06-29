import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from 'react-navigation';
import NfcManager, {ByteParser, Ndef} from "react-native-nfc-manager";

import {def, info, std} from "../../style";
import {readOneNFC, unregisterNFC} from "../../NFCapi";

interface FormatTagProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface FormatTagState {
  read: boolean,
  tag: Tag | null
}

class FormatTag extends Component<FormatTagProps, FormatTagState> {

  constructor(props: FormatTagProps) {
    super(props);
    this.state = {
      read: false,
      tag: null
    }
  }
  componentDidMount(): void {
    this.setState({read: true});
    readOneNFC()
      .then((tag) => this.setState({tag: tag, read: false}))
      .catch(er => console.error(er));
  }

  public render() {
    console.log(this.state.tag? this.state.tag : null);
    let tagText = "";
    if(this.state.tag && this.state.tag.ndefMessage) {
      tagText = Ndef.text.decodePayload(this.state.tag.ndefMessage[0].payload);
    }
    let tagTypes = "";
    if(this.state.tag && this.state.tag.techTypes) {
      for(let i=0; i<this.state.tag.techTypes.length; i++) {
        if(i== 0) {
          tagTypes = this.state.tag.techTypes[i].substr(17);
        } else {
          tagTypes = tagTypes + ", " + this.state.tag.techTypes[i].substr(17);
        }
      }
    }
    return (
      <View style={std.page}>
        { !this.state.tag?
          <View>
            <Text style={std.title}>Formatta un tag</Text>
            <Text style={std.text}>
              Effettua la lettura di un tag NFC tramite il tuo telefono.
              Qui di seguito visualizzerai tutte le informazioni che il tag riporta.
            </Text>
            <TouchableOpacity
              style={std.button}
              onPress={() => {
                this.setState({read:true});
                readOneNFC()
                  .then((tag) => this.setState({tag: tag, read: false}))
                  .catch(er => console.error(er));
              }}>
              <Text style={std.textButton}>Leggi</Text>
            </TouchableOpacity>
          </View>
          :
        <View>
          <Text style={std.title}>Tag formattato!</Text>
          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>Tag id:</Text>
            <Text style={[std.text, info.t2]}>{this.state.tag.id}</Text>
          </View>
          <TouchableOpacity
            style={std.button}
            onPress={() => {
              this.setState({read: true});
              readOneNFC()
                .then((tag) => this.setState({tag: tag, read: false}))
                .catch(er => console.error(er));
            }}>
            <Text style={std.textButton}>Formatta altro tag</Text>
          </TouchableOpacity>
        </View>
        }

        <Modal
          transparent={true}
          visible={this.state.read}
          onRequestClose={() => {this.setState({read: false})}}
        >
          <View style={std.modal}>
            <View style={std.card}>
              <Text style={std.textModal}>Avvicina un tag NFC...</Text>
              <View style={std.boxButton}>
                <TouchableOpacity
                  style={std.modalButton2}
                  onPress={() => {
                    this.setState({read: false});
                    unregisterNFC()
                      .then(log => console.log(log))
                      .catch(er => console.warn(er));
                  }}>
                  <Text style={std.text}>Annulla</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    );
  }

}

export default withNavigation(FormatTag);


const styles = StyleSheet.create({

});

interface Tag {
  id: string,
  maxSize?: number,
  techTypes?: string[],
  ndefMessage?: string[]
}