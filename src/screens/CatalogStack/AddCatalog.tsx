import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Switch} from 'react-native';
import {NavigationActions, NavigationScreenProp, withNavigation} from 'react-navigation';
import {store} from "../../App";
import {IAddCatalog} from "../../redux/action";
import Database from "../../firebaseAPI/database";

import {std} from "../../style";
import {info} from "../../style";

interface AddCatalogProps {
  navigation: NavigationScreenProp<object>;
}

interface AddCatalogState {
  name: string;
  description: string;
  private: boolean;
}

class AddCatalog extends Component<AddCatalogProps, AddCatalogState> {

  constructor(props: AddCatalogProps) {
    super(props);
    this.state = {
      name: null,
      description: null,
      private: true,
    }
  }

  public render() {
    return (
      <View style={std.screen}>
        <Text style={std.title}> Aggiungi un catalogo:</Text>
        <View style={info.textBox}>
          <Text style={[std.text, info.t1]}>Nome:</Text>
          <TextInput
            style={[std.text, info.t2]}
            placeholder="name"
            onChangeText={text => this.setState({name: text})}
          />
        </View>
        <View style={info.textBox}>
          <Text style={[std.text, info.t1]}>Descrizione:</Text>
          <TextInput
            style={[std.text, info.t2]}
            placeholder="description"
            onChangeText={text => this.setState({description: text})}
          />
        </View>
        <View style={info.textBox}>
          <Text style={[std.text, info.t1]}>Privato:</Text>
          <View style={info.switch}>
            <Switch
              value={this.state.private}
              onValueChange={()=>{this.setState({private: !this.state.private})}}
            />
          </View>
        </View>
        <TouchableOpacity
          style={std.button}
          onPress={this.add}>
          <Text style={std.textButton}>Aggiungi</Text>
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
        cid: id,
        name: this.state.name,
        description: this.state.description,
        class: "standard",
        private: this.state.private
      });
      Database.addCatalog(id, this.state.name, this.state.description, this.state.private);
      this.props.navigation.dispatch(NavigationActions.back());
      this.props.navigation.navigate("Catalog", {name: this.state.name, id: id});
    }
  }
}

export default withNavigation(AddCatalog);