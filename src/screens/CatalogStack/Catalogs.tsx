import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import { withNavigation } from 'react-navigation';
import Auth from "../../firebaseAPI/auth";
import NfcManager, {Ndef, NfcTech, ByteParser} from 'react-native-nfc-manager'

interface CatalogsProps {
}

interface CatalogsState {
}

class Catalogs extends Component<CatalogsProps, CatalogsState> {

  constructor(props: CatalogsProps) {
    super(props);
    this.state = {support: "",
    xx: "",
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text>Cataloghi</Text>
        <Button
          title={"Drawable navigator"}
          onPress={()=>{}}>
          Esci
        </Button>
        <Text>{this.state.support}</Text>
        <Button
          title={"blblblblbl"}
          id={"button"}
          onPress={()=>{this.ciaone()}}>
          Esci
        </Button>
        <Text>{this.state.xx}</Text>
        <Button
          title={"START"}
          id={"button"}
          onPress={()=>{this.ciaone1()}}>
          Esci
        </Button>
      </View>
    );
  }

  private ciaone() {
    NfcManager.start({
      onSessionClosedIOS: () => {
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

  private ciaone1() {
      NfcManager.registerTagEvent(
      tag => {console.warn(ByteParser.byteToString(tag.ndefMessage[0].payload))},
      'Hold your device over the tag',
      false
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
    backgroundColor: '#F5FCFF',
  },

});
