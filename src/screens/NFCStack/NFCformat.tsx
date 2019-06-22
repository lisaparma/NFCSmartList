import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationStateRoute,
  withNavigation
} from 'react-navigation';
import NfcManager, {ByteParser, Ndef} from "react-native-nfc-manager";

import {std} from "../../style";
import {Rule} from "../../components/Rule";
import Auth from "../../firebaseAPI/auth";

interface AvatarsProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface AvatarsState {
  time: number,
  error: boolean
}

class NFCformat extends Component<AvatarsProps, AvatarsState> {

  constructor(props: AvatarsProps) {
    super(props);
    this.state = {
      time: 0,
      error: false
    }
  }

  public render() {
    return (
      <View style={std.screen}>
        <Text style={std.title}>Formatta il tuo tag</Text>
        <Text style={std.text}>
          In questa pagina puoi formattare un tag NFC mai utilizzato prima,
          così da poterci associare un id successivamente. {"\n"}
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
          text={"Ora il tuo tag può ricevere un id."}
          id={3}
          time={this.state.time}
        />

        { this.state.time === 0 &&
        <TouchableOpacity
          style={std.button}
          onPress={this.format}>
          <Text style={std.textButton}>Procedi</Text>
        </TouchableOpacity>
        }
        { (this.state.time !== 0 && this.state.time !== 3) &&
        <TouchableOpacity
          style={std.button}
          onPress={() => {this.unreg(); this.stop(); this.setState({time: 0})}}>
          <Text style={std.textButton}>Annulla</Text>
        </TouchableOpacity>
        }
        { this.state.time === 3 &&
        <TouchableOpacity
          style={std.button}
          onPress={() => {this.setState({time: 0}); this.format()}}>
          <Text style={std.textButton}>Altro tag</Text>
        </TouchableOpacity>
        }
        <Modal
          transparent={true}
          visible={this.state.error}
          onRequestClose={() => {this.setState({error: false})}}
        >
          <View style={std.modal}>
            <View style={std.card}>
              <Text style={std.text}>Il tag risulta già formattato</Text>
              <View style={std.boxButton}>
              <TouchableOpacity
                style={std.modalButton1}
                onPress={() => {
                  this.setState({error: false});
                }}>
                <Text style={std.text}>Ok</Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  private format = () => {
    this.setState({time: 1});
    NfcManager.start()
      .then(() => {
        NfcManager.registerTagEvent(
          tag => {
            this.setState({time: 2});
            NfcManager.requestNdefWrite(null, {format: true})
              .then(() => {
                  this.setState({time: 3});
                  this.unreg();
                  this.stop();
                }
              )
              .catch(err => {
                this.setState({error: true, time: 0})
                this.unreg();
                this.stop();
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
