import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from 'react-navigation';
import NfcManager, {ByteParser, Ndef} from "react-native-nfc-manager";

import {def, std} from "../../style";

interface AvatarsProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface AvatarsState {
  time: number
}

class NFCid extends Component<AvatarsProps, AvatarsState> {

  constructor(props: AvatarsProps) {
    super(props);
    this.state = {
      time: 0
    }
  }

  public render() {
    return (
      <View style={std.screen}>
        <Text style={std.title}>Setta un id al tuo tag</Text>
        <Text style={std.text}>In questa pagina puoi settare un id univoco ad
          uno tuo tag NFC (precedentemente formattato in modo
          giusto) oppure modificare quello già presente.
          Procedi cliccando sul tasto sottostante e seguendo le istruzioni
          che verranno fuori man mano.
        </Text>
        <TouchableOpacity
          style={std.button}
          onPress={this.addID}>
          <Text style={std.textButton}>Set id tag NFC</Text>
        </TouchableOpacity>

        <View style={[styles.rules, this.state.time === 1 && styles.now]}>
          <Text style={std.text}>Avvicina il tag</Text>
          <Text style={std.text}>Avvicina il tag NFC al lettore NFC del telefono.
            Solitamente si trova nella parte superiore del telefono.
          </Text>
        </View>
        <View style={[styles.rules, this.state.time === 2 && styles.now]}>
          <Text style={std.text}>Riavvicina il tag</Text>
          <Text style={std.text}> Ora che è stata riconosciuta la presenza di un
            tag NFC, allontana e avvicina di nuovo il tag al lettore in modo da
            permettere la sua scrittura.
          </Text>
        </View>
        <View style={[styles.rules, this.state.time === 4 && styles.now]}>
          <Text style={std.text}>Tag pronto!</Text>
          <Text style={std.text}> Il nuovo id del tag è ...
            Ora può essere associato ad un oggetto di un tuo catalogo per fare il check.
          </Text>
        </View>

      </View>
    );
  }

  private write(tagID: string){
    this.setState({time: 2});
    const mess = Ndef.encodeMessage([Ndef.textRecord(tagID)]);
    NfcManager.requestNdefWrite(mess)
      .then(() => {
          this.setState({time: 4});
          this.unreg();
          this.stop();
        }
      )
      .catch(err => {
        console.warn(err);
      })
  }

  private addID = () => {
    this.setState({time: 1});
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
  rules: {
    paddingVertical: 10,
  },
  now: {
    backgroundColor: def.red
  }
});
