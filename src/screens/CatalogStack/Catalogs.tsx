import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';
import Auth from "../../firebaseAPI/auth";
import NfcManager, {Ndef, NfcTech, ByteParser} from 'react-native-nfc-manager'
import {store} from "../../App";
import {IAddCatalog} from "../../redux/action";
import {IStore, ICatalog} from "../../redux/IStore";
import {element} from "prop-types";

interface CatalogsProps {
}

interface CatalogsState {
  catalogs: ICatalog[]
}

class Catalogs extends Component<CatalogsProps, CatalogsState> {

  private mUnsubscribeFromStore: any;

  constructor(props: CatalogsProps) {
    super(props);
    this.state = {
      catalogs: [],
    }
  }

  public componentDidMount(): void {
    this.mUnsubscribeFromStore = store.subscribe(this.onStoreChange);
  }

  public componentWillUnmount(): void {
    this.mUnsubscribeFromStore();
  }

  private onStoreChange = () => {
    const currentState: IStore = store.getState();
    if(currentState.catalogs !== this.state.catalogs) {
      this.setState({
        catalogs: currentState.catalogs,
      });
    }
  }

  public render() {
    const elements = (this.state.catalogs).map(
      (element) => (
      <View style={styles.item} key={element.id}>
        <Text> {element.name + element.id} </Text>
      </View>)
    );
    return (
      <View style={styles.container}>
      <ScrollView>
        <Text> I tuoi cataloghi:</Text>
        {elements}
      </ScrollView>
      <TouchableOpacity
        style={styles.plus}
        onPress={this.add}>
        <Text>Aggiungi</Text>
      </TouchableOpacity>
      </View>
    );
  }

  private add = () => {
    store.dispatch<IAddCatalog>({
      type: "ADD_CATALOG",
      id: this.state.catalogs.length,
      name: "Un catalogo"
    })
  }

  // private start() {
  //   NfcManager.start({
  //     onSessionClosedIOS: () => {
  //       NfcManager.unregisterTagEvent();
  //       console.warn('ios session closed');
  //     }
  //   })
  //   .then(result => {
  //         console.warn('start OK', result);
  //         this.setState({support: "true",});
  //     })
  //     .catch(error => {
  //         console.warn('device does not support nfc!');
  //         this.setState({support: "false",});
  //     })
  // }
  //
  // private write() {
  //     NfcManager.registerTagEvent(
  //     tag => {this.setState({xx:ByteParser.byteToString(tag.ndefMessage[0].payload)})},
  //     'Hold your device over the tag',
  //     false,
  //     )
  //   }
}


export default withNavigation(Catalogs);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderColor: "black",
    borderWidth: 2,
    margin: 10
  },
  plus: {
    padding: 20
  }

});
