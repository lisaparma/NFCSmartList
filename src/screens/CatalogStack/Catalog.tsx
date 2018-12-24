import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import NfcManager, {Ndef, NfcTech, ByteParser} from 'react-native-nfc-manager'
import {store} from "../../App";
import {IAddCatalog, IAddItem, IRemoveCatalog} from "../../redux/action";
import {IStore, ICatalog, IItem} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";

interface CatalogsProps {
  navigation: NavigationScreenProp<object>;
}

interface CatalogsState {
  items: {[id: string]: IItem};
  cid: string;
}

class Catalogs extends Component<CatalogsProps, CatalogsState> {

  private mUnsubscribeFromStore: any;

  constructor(props: CatalogsProps) {
    super(props);
    const cid = this.props.navigation.getParam("id");
    this.state = {
      items: store.getState().catalogs[cid].items? {...store.getState().catalogs[cid].items} : {},
      cid: cid,
    }
  }

  public componentDidMount(): void {
    this.mUnsubscribeFromStore = store.subscribe(this.onStoreChange);
  }

  public componentWillUnmount(): void {
    this.mUnsubscribeFromStore();
  }

  public render() {
    console.log(this.state.items)
    const elements = Object.keys(this.state.items)
      .map((element) => (
        <TouchableOpacity
          style={styles.item}
          key={this.state.items[element].iid}
        >
          <Text> {this.state.items[element].name} </Text>
        </TouchableOpacity>)
      );
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text> I tuoi item:</Text>
          {elements}
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
    const currentState: ICatalog = store.getState().catalogs[this.state.cid];
    if(currentState.items !== this.state.items) {
      this.setState({
        items: {...currentState.items},
      });
    }
  };

  private remove = () => {
    this.componentWillUnmount();
    const cid = this.state.cid;
    store.dispatch<IRemoveCatalog>({
      type: "REMOVE_CATALOG",
      cid: cid
    });
    Database.removeCatalog(cid);
    this.props.navigation.navigate("CatalogList");
  };

  private addItem = () => {
    const cid = this.state.cid;
    var uuid = require('react-native-uuid');
    const iid = uuid.v4();
    store.dispatch<IAddItem>({
      type: "ADD_ITEM",
      cid: cid,
      iid: iid,
      name: "sav",
      description: "afwer"
    });
    Database.addItem(cid, iid, "ewf", "drg")
  };
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
