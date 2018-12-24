import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import NfcManager, {Ndef, NfcTech, ByteParser} from 'react-native-nfc-manager'
import {store} from "../../App";
import {IAddCatalog, IAddItem, IRemoveCatalog} from "../../redux/action";
import {IStore, ICatalog} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";

interface CatalogsProps {
  navigation: NavigationScreenProp<object>;
}

interface CatalogsState {
  catalogs: {[id: string]: ICatalog}
}

class Catalogs extends Component<CatalogsProps, CatalogsState> {

  private mUnsubscribeFromStore: any;

  constructor(props: CatalogsProps) {
    super(props);
    this.state = {
      catalogs: {},
    }
  }

  public componentDidMount(): void {
    this.mUnsubscribeFromStore = store.subscribe(this.onStoreChange);
  }

  public componentWillUnmount(): void {
    this.mUnsubscribeFromStore();
  }

  public render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text> I tuoi item:</Text>
        </ScrollView>
        <TouchableOpacity
          style={styles.plus}
          onPress={this.addItem}>
          <Text>Aggiungi item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.plus}
          onPress={this.remove}>
          <Text>Elimina catalogo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private onStoreChange = () => {
    const currentState: IStore = store.getState();
    if(currentState.catalogs !== this.state.catalogs) {
      this.setState({
        catalogs: currentState.catalogs,
      });
    }
  };

  private remove = () => {
    const cid = this.props.navigation.getParam("id");
    store.dispatch<IRemoveCatalog>({
      type: "REMOVE_CATALOG",
      id: cid
    });
    Database.removeCatalog(cid);
  };

  private addItem = () => {
    const cid = this.props.navigation.getParam("id");
    var uuid = require('react-native-uuid');
    const iid = uuid.v4();
    store.dispatch<IAddItem>({
      type: "ADD_ITEM",
      cid: cid,
      iid: iid,
      name: "sav",
      description: "afwer",
      tag: "null"
    });
  };


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
    borderColor: "#87CEFA",
    borderWidth: 2,
    borderRadius: 30,
    margin: 10
  },
  plus: {
    padding: 20
  }

});
