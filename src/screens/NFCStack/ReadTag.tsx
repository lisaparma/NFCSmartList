import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from 'react-navigation';
import NfcManager, {ByteParser, Ndef} from "react-native-nfc-manager";

import {def, info, std} from "../../style";
import {readOneNFC, unregisterNFC} from "../../NFCapi";

interface ReadTagProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface ReadTagState {
  read: boolean,
  tag: Tag | null
}

class ReadTag extends Component<ReadTagProps, ReadTagState> {

  constructor(props: ReadTagProps) {
    super(props);
    this.state = {
      read: false,
      tag: null
    }
  }

  public render() {
    console.log(this.state.tag? this.state.tag.id : null);
    return (
      <View style={std.screen}>
        { !this.state.tag?
          <View>
            <Text style={std.title}>Leggi un tag</Text>
            <Text style={std.text}>
              dhgjdghjydgjy
            </Text>
            <TouchableOpacity
              style={std.modalButton2}
              onPress={() => {
                this.setState({read:true});
                readOneNFC()
                  .then((tag) => this.setState({tag: tag, read: false}))
                  .catch(er => console.error(er));
              }}>
              <Text style={std.text}>Leggi</Text>
            </TouchableOpacity>
          </View>
          :
        <View>
          <Text style={std.title}>Dettagli tag letto:</Text>
          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>Tag id:</Text>
            <Text style={[std.text, info.t2]}>{this.state.tag.id}</Text>
          </View>
          {this.state.tag.maxSize &&
          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>Max Size:</Text>
            <Text style={[std.text, info.t2]}>{this.state.tag.maxSize}</Text>
          </View>
          }
          {this.state.tag.techTypes &&
          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>Tech Types:</Text>
            <Text style={[std.text, info.t2]}>{this.state.tag.techTypes[0]}</Text>
          </View>
          }
          {this.state.tag.ndefMessage &&
          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>Messggio NDEF:</Text>
            {/*<Text style={[std.text, info.t2]}>{this.state.tag.ndefMessage[0]}</Text>*/}
          </View>
          }
          <TouchableOpacity
            style={std.modalButton2}
            onPress={() => {
              this.setState({read: true})
              readOneNFC()
                .then((tag) => this.setState({tag: tag, read: false}))
                .catch(er => console.error(er));
            }}>
            <Text style={std.text}>Ri Leggi</Text>
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
              <Text style={std.text}>Avvicina un tag NFC...</Text>
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

export default withNavigation(ReadTag);


const styles = StyleSheet.create({

});

interface Tag {
  id: string,
  maxSize?: number,
  techTypes?: string[],
  ndefMessage?: string[]
}