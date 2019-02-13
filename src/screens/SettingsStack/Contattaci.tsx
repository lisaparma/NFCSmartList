import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput, Picker} from 'react-native';
import {
  NavigationActions, NavigationParams, NavigationScreenProp, NavigationStateRoute,
  withNavigation
} from 'react-navigation';
import {def, getColor, getIcon, getLabel, info, labels, options, std} from "../../style";
import {Icon} from "react-native-elements";
import {store} from "../../App";
import SimplePicker from 'react-native-simple-picker';
import {IAddCatalog} from "../../redux/action";
import Database from "../../firebaseAPI/database";

interface ContattaciProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface ContattaciState {
  title: string;
  description: string;
  mod: number;
}

class Contattaci extends Component<ContattaciProps, ContattaciState> {

  constructor(props: ContattaciProps) {
    super(props);
    this.state = {
      title: "",
      description: "",
      mod: 0,
    }
  }

  public render() {
    const options=[0, 1, 2];
    const labels=["Bug", "Crash", "Feature"]
    return (
      <ScrollView style={std.screen}>
        <Text style={[std.title]}>Problemi?</Text>
        <Text style={[std.text]}>
          Segnalaci tutti i problemi che riscontri durante l'utilizzo dell'applicazione
          o suggeriscici nuovi modi per migliorare!{"\n"}
          In questo modo ci aiuterai a rendere NFC Smart List sempre più affidabile e usabile.
        </Text>

        <View style={info.textBox}>
          <Text style={[std.text, info.t1]}>Titolo:</Text>
          <TextInput
            style={[std.text, info.t2]}
            placeholder="name"
            onChangeText={text => this.setState({title: text})}
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
          <Text style={[std.text, info.t1]}>Tipologia: </Text>
          {store.getState().user.os === "ios" &&
          <View>
            <Text
              style={[std.text, info.t2]}
              onPress={() => {
                this.refs.picker.show();
              }}
            >
              {labels[this.state.mod]}
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
          </Picker>
          }
        </View>
        <TouchableOpacity
          style={std.button}
          onPress={this.send}>
          <Text style={std.textButton}>Aggiungi</Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }
  private send = () => {
    Database.send(store.getState().user.email, this.state.title, this.state.description, this.state.mod);
    this.props.navigation.dispatch(NavigationActions.back());
  }
}

export default withNavigation(Contattaci);


const styles = StyleSheet.create({
  box: {
    paddingTop: 10
  }
});
