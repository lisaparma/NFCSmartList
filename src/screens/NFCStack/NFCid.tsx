import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from 'react-navigation';
import NfcManager, {ByteParser, Ndef} from "react-native-nfc-manager";

import {def, std} from "../../style";
import {Rule} from "../../components/Rule";

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
        <Text style={std.text}>
          In questa pagina puoi settare un id univoco ad
          uno tuo tag NFC (precedentemente formattato in modo
          giusto) oppure modificare quello già presente.
          Procedi cliccando sul tasto sottostante e seguendo le istruzioni
          che verranno fuori man mano.
        </Text>

        <Rule
          title={"Avvicina il tag"}
          text={"Avvicina il tag NFC al lettore NFC del telefono.\n" +
          "Solitamente si trova nella parte superiore del telefono."}
          id={1}
          time={this.state.time}
        />
        <Rule
          title={"Riavvicina il tag"}
          text={"Ora che è stata riconosciuta la presenza di un\n" +
          "tag NFC, allontana e avvicina di nuovo il tag al lettore in modo da\n" +
          "permettere la sua scrittura."}
          id={2}
          time={this.state.time}
        />
        <Rule
          title={"Tag pronto!"}
          text={"Ora il tuo tag può essere associato ad un oggetto di un tuo catalogo per fare il check."}
          id={3}
          time={this.state.time}
        />

        { this.state.time === 0 &&
          <TouchableOpacity
            style={std.button}
            onPress={this.addID}>
            <Text style={std.textButton}>Procedi</Text>
          </TouchableOpacity>
        }
        { (this.state.time !== 0 && this.state.time !== 3) &&
          <TouchableOpacity
            style={std.button}
            onPress={() => {NfcManager.unregisterTagEvent(); NfcManager.stop(); this.setState({time: 0})}}>
            <Text style={std.textButton}>Annulla</Text>
          </TouchableOpacity>
        }
        { this.state.time === 3 &&
        <TouchableOpacity
          style={std.button}
          onPress={() => {this.setState({time: 0}); this.addID}}>
          <Text style={std.textButton}>Altro tag</Text>
        </TouchableOpacity>
        }
      </View>
    );
  }

  private write(tagID: string){
    this.setState({time: 2});
    const mess = Ndef.encodeMessage([Ndef.textRecord(tagID)]);
    NfcManager.requestNdefWrite(mess)
      .then(() => {
          this.setState({time: 3});
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

  private unreg() {
    console.warn("unregister");
    NfcManager.unregisterTagEvent();
  }

  private stop() {
    console.warn("Stop");
    NfcManager.stop();
  }

}

export default withNavigation(NFCid);


const styles = StyleSheet.create({

});
