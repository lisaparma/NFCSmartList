import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Switch} from 'react-native';
import {NavigationActions, NavigationScreenProp, withNavigation} from 'react-navigation';
import {store} from "../../App";
import {IEditCatalog, IEditItem, IRemoveCatalog, IRemoveItem} from "../../redux/action";
import {ICatalog, IItem} from "../../redux/IStore";
import Database from "../../firebaseAPI/database";

import {std} from "../../style";
import {info} from "../../style";

interface FDetailsCatalogProps {
  navigation: NavigationScreenProp<object>;
}

interface FDetailsCatalogState {
  catalog: ICatalog;
  name: string;
  description: string;
}

class FDetailsCatalog extends Component<FDetailsCatalogProps, FDetailsCatalogState> {

  constructor(props: FDetailsCatalogProps) {
    super(props);
    this.state = {
      catalog: this.props.navigation.getParam("catalog"),
      name: this.props.navigation.getParam("catalog").name,
      description: this.props.navigation.getParam("catalog").description,
    }
  }
  public render() {
    return (
      <View style={std.screen}>
        <Text style={std.title}> Informazioni catalogo:</Text>
          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>Nome:</Text>
            <Text style={[std.text, info.t2]}>{this.state.catalog.name}</Text>
          </View>
          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>Descrizione:</Text>
            <Text style={[std.text, info.t2]}>{this.state.catalog.description}</Text>
          </View>
      </View>
    );
  }
}

export default withNavigation(FDetailsCatalog);

