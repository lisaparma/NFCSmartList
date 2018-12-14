import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import { withNavigation } from 'react-navigation';
import Auth from "../../firebaseAPI/auth";
import NfcManager, {Ndef, NfcTech, ByteParser} from 'react-native-nfc-manager'

interface CatalogsProps {
}

interface CatalogsState {
  support: string,
  xx: string
}

class Catalogs extends Component<CatalogsProps, CatalogsState> {

  constructor(props: CatalogsProps) {
    super(props);
    this.state = {
      support: "",
      xx: "",
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <Button
          title={"Vado?"}
          id={"button"}
          onPress={()=>{this.start()}}/>
        <Text>{this.state.support}</Text>
        <Button
          title={"Leggimi"}
          id={"button"}
          onPress={()=>{this.write()}}/>
        <Text>{this.state.xx}</Text>
      </View>
    );
  }

  private start() {
    NfcManager.start({
      onSessionClosedIOS: () => {
        NfcManager.unregisterTagEvent();
        console.warn('ios session closed');
      }
    })
    .then(result => {
          console.warn('start OK', result);
          this.setState({support: "true",});
      })
      .catch(error => {
          console.warn('device does not support nfc!');
          this.setState({support: "false",});
      })
  }

  private write() {
      NfcManager.registerTagEvent(
      tag => {this.setState({xx:ByteParser.byteToString(tag.ndefMessage[0].payload)})},
      'Hold your device over the tag',
      false,
      )
    }
}


export default withNavigation(Catalogs);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 1000,
  },

});
