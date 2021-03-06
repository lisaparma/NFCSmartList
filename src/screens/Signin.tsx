import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';

import Auth from "../firebaseAPI/auth";
import {NavigationParams, NavigationScreenProp, NavigationStateRoute, withNavigation} from "react-navigation";

import {std, log, def} from "../style";

interface AppProps {
  navigation: NavigationScreenProp<NavigationStateRoute<NavigationParams>>;
}

interface AppState {
  email: string;
  username: string;
  password: string;
  password2: string;
  error: string;
}

class Signin extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: "",
      error: ""
    }
  }

  public render() {
    return (
      <ScrollView style={log.screen}>
        <View style={log.screen2}>
          <TextInput
            style={log.input}
            placeholder="E-mail"
            autoCapitalize={"none"}
            autoCorrect={false}
            onChangeText={text => this.setState({email: text.toLocaleLowerCase().trim(), error: ""})}
          />
          <TextInput
            style={log.input}
            placeholder="username"
            autoCapitalize={"none"}
            autoCorrect={false}
            onChangeText={text => this.setState({username: text.trim(), error: ""})}
          />
          <TextInput
            style={log.input}
            placeholder="Password"
            autoCapitalize={"none"}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => this.setState({password: text.trim(), error: ""})}
          />
          <TextInput
            style={log.input}
            placeholder="Ripeti password"
            autoCapitalize={"none"}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => this.setState({password2: text.trim(), error: ""})}
          />
          { this.state.error !== "" &&
          <View style={std.error}>
            <Text style={[std.text, std.warningText]}>{this.state.error}</Text>
          </View>
          }
          <TouchableOpacity
            style={[
              std.button,
              log.loginButton,
              (this.state.email === "" || this.state.password ===  "" || this.state.password2 ===  "") && {backgroundColor: def.grey1}
            ]}
            disabled={(this.state.email === "" || this.state.password ===  "" || this.state.password2 ===  "")}
            onPress={this.registerAcc}
          >
            <Text style={std.textButton}>Registrati</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>this.props.navigation.navigate("Login")}>
            <Text style={[std.text, log.link, {padding: 10}]}>Sono già registrato</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  private registerAcc = () => {
    if(this.check()) {
      Auth.registerAccount(this.state.email, this.state.password, this.state.username);
    }
  };

  private check(): boolean {
    if(this.state.email ===  ""
      && this.state.password ===  ""
      && this.state.password2 === "") {
      this.setState({error: "Compila tutti i campi"});
      return false;
    }
    if(this.state.password.toString().length < 8) {
      this.setState({error: "Password troppo corta"});
      return false;
    }
    if(this.state.password !== this.state.password2){
      this.setState({error: "Le due password non corrispondono"});
      return false;
    }
    return true;
  }

}

export default withNavigation(Signin);