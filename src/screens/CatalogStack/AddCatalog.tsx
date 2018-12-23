import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import {NavigationActions, withNavigation} from 'react-navigation';
import NfcManager, {Ndef, NfcTech, ByteParser} from 'react-native-nfc-manager'
import {store} from "../../App";
import {IAddCatalog} from "../../redux/action";
import {IStore, ICatalog} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";


interface AddCatalogProps {
}

interface AddCatalogState {
  name: string;
  description: string;
}

class AddCatalog extends Component<AddCatalogProps, AddCatalogState> {

  constructor(props: AddCatalogProps) {
    super(props);
    this.state = {
      name: null,
      description: null
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Name"
          onChangeText={text => this.setState({name: text})}
        />
        <TextInput
          placeholder="Description"
          onChangeText={text => this.setState({description: text})}
        />
        <TouchableOpacity
          style={styles.plus}
          onPress={this.add}>
          <Text>Aggiungi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private add = () => {
  if(this.state.name !== null && this.state.description !== null) {
    var uuid = require('react-native-uuid');
    const id = uuid.v4();
    store.dispatch<IAddCatalog>({
      type: "ADD_CATALOG",
      id: id,
      name: this.state.name,
      description: this.state.description,
      class: "standard"
    });
    Database.addCatalog(id, this.state.name, this.state.description);
    this.props.navigation.dispatch(NavigationActions.back());
    this.props.navigation.navigate("Catalog", {name: this.state.name, id: id});
  }
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
