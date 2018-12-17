import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {NavigationActions, withNavigation} from 'react-navigation';
import NfcManager, {Ndef, NfcTech, ByteParser} from 'react-native-nfc-manager'
import {store} from "../../App";
import {IAddCatalog} from "../../redux/action";
import {IStore, ICatalog} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";
interface AddCatalogProps {
}

interface AddCatalogState {
}

class AddCatalog extends Component<AddCatalogProps, AddCatalogState> {

  constructor(props: AddCatalogProps) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <View style={styles.container}>
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
      id: Object.keys(store.getState().catalogs).length,
      name: "Un catalogo"
    });
    //Database.addCatalog("catalogo", "propvaprovaprova");
    this.props.navigation.dispatch(NavigationActions.back());
    this.props.navigation.navigate("Catalog", {name:"Un catalogoo"});
  }
}

export default withNavigation(AddCatalog);

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
