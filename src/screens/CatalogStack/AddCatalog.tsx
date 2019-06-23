import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput, Picker, KeyboardAvoidingView, ScrollView} from 'react-native';
import {
  NavigationActions,
  NavigationParams,
  NavigationScreenProp,
  NavigationStateRoute,
  withNavigation
} from 'react-navigation';
import SimplePicker from 'react-native-simple-picker';
import { Switch } from 'react-native-switch';

import {store} from "../../App";
import {IAddCatalog} from "../../redux/action";
import Database from "../../firebaseAPI/database";
import {options, labels, getLabel, def, getIcon, getColor} from "../../style";
import {std} from "../../style";
import {info} from "../../style";
import {Icon} from "react-native-elements";

interface AddCatalogProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface AddCatalogState {
  name: string;
  description: string;
  private: boolean;
  mod: number;
  modal: boolean;
}

class AddCatalog extends Component<AddCatalogProps, AddCatalogState> {

  public refs: {picker: any};

  constructor(props: AddCatalogProps) {
    super(props);
    this.state = {
      name: "",
      description: "",
      private: true,
      mod: 0,
      modal: false,
    }
  }

  public render() {

    return (
      <View style={std.page}>
        <ScrollView>
          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>
              Nome *:
            </Text>
            <TextInput
              style={[std.text, info.t2]}
              placeholder="Inserisci un nome"
              onChangeText={text => this.setState({name: text})}
            />
          </View>

          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>Descrizione:</Text>
            <TextInput
              style={[std.text, info.t2]}
              placeholder="Inserisci una descrizione"
              onChangeText={text => this.setState({description: text})}
              multiline={true}
            />
          </View>

          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>Categoria:</Text>
            <View style={info.picker}>
              <Icon
                name={getIcon(this.state.mod)}
                size={30}
                color={getColor(this.state.mod)}
              />
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
                  style={{flex: 1, backgroundColor: def.grey1}}
                  ref={'picker'}
                  options={options}
                  labels={labels}
                  onSubmit={(option: any) => {this.setState({mod: option});
                  }}
                />
                </View>
              }
              {store.getState().user.os !== "ios" &&
              <Picker
                style={{flex: 1}}
                selectedValue={this.state.mod}
                onValueChange={(itemValue) => this.setState({mod: itemValue})}>
                <Picker.Item label={labels[0]} value={options[0]}/>
                <Picker.Item label={labels[1]} value={options[1]}/>
                <Picker.Item label={labels[2]} value={options[2]}/>
                <Picker.Item label={labels[3]} value={options[3]}/>
                <Picker.Item label={labels[4]} value={options[4]}/>
              </Picker>
              }
            </View>
          </View>

          <View style={info.textBox}>
            <Text style={[std.text, info.t1]}>Sicurezza:</Text>
            <View style={info.switch}>
              { this.state.private ?
                <Text style={[std.text, info.t2, {paddingRight: 10}]}>Privato</Text>
                :
                <Text style={[std.text, info.t2, {paddingRight: 10}]}>Pubblico</Text>
              }
              <Switch
                style={ {paddingHorizontal: 10}}
                value={this.state.private}
                onValueChange={()=>{this.setState({private: !this.state.private})}}
              />
            </View>
          </View>

        </ScrollView>

        <TouchableOpacity
          style={[std.button, this.state.name === "" && std.buttonDisabled]}
          onPress={this.add}
          disabled={this.state.name ===  ""}
        >
          <Text style={std.textButton}>Aggiungi</Text>
        </TouchableOpacity>

      </View>
    );
  }

  private add = () => {
    if(this.state.name !== "") {
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
    } else {
       // TODO: errore! Inswerire il nome per continuare
    }
  }
}

export default withNavigation(AddCatalog);