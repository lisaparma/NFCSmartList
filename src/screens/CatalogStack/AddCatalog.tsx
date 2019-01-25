import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Switch, Picker} from 'react-native';
import {NavigationActions, NavigationScreenProp, withNavigation} from 'react-navigation';
import {store} from "../../App";
import {IAddCatalog} from "../../redux/action";
import Database from "../../firebaseAPI/database";

import SimplePicker from 'react-native-simple-picker';

import {options, labels, getLabel} from "../../style";
import {std} from "../../style";
import {info} from "../../style";

interface AddCatalogProps {
  navigation: NavigationScreenProp<object>;
}

interface AddCatalogState {
  name: string;
  description: string;
  private: boolean;
  mod: number;
  modal: boolean;
}

class AddCatalog extends Component<AddCatalogProps, AddCatalogState> {

  constructor(props: AddCatalogProps) {
    super(props);
    this.state = {
      name: null,
      description: null,
      private: true,
      mod: 0,
      modal: false,
    }
  }

  public render() {

    return (
      <View style={std.screen}>
        <Text style={std.title}>
          Aggiungi un catalogo:</Text>
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
          <Text style={[std.text, info.t1]}>Colore:</Text>
          {store.getState().user.os === "ios" &&
            <View>
              <Text
                style={[std.text, info.t2]}
                onPress={() => {
                  this.refs.picker.show();
                }}
              >
                {getLabel(this.state.mod)}
              </Text>
            <SimplePicker
              style={{flex: 1, backgroundColor: "#999999"}}
              ref={'picker'}
              options={options}
              labels={labels}
              onSubmit={(option) => {this.setState({mod: option});
              }}
            />
            </View>
          }
          {store.getState().user.os !== "ios" &&
          <Picker
            style={{flex: 1}}
            selectedValue={getLabel(this.state.mod)}
            onValueChange={(itemValue) => this.setState({mod: itemValue})}>
            <Picker.Item label={labels[0]} value={options[0]}/>
            <Picker.Item label={labels[1]} value={options[1]}/>
            <Picker.Item label={labels[2]} value={options[2]}/>
            <Picker.Item label={labels[3]} value={options[3]}/>
            <Picker.Item label={labels[4]} value={options[4]}/>
          </Picker>
          }
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
        mod: this.state.mod,
        private: this.state.private
      });
      Database.addCatalog(id, this.state.name, this.state.description, this.state.private, this.state.mod);
      this.props.navigation.dispatch(NavigationActions.back());
      this.props.navigation.navigate("Catalog", {name: this.state.name, id: id});
    }
  }
}

export default withNavigation(AddCatalog);